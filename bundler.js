//need to append extension to style files when they are pushed into dependencies

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const babel = require('babel-core');
// const CSSOM = require('cssom');
const cssTree = require('css-tree');
const isBuiltinModule = require('is-builtin-module');
const glob = require('glob');
let ID = 0;
/* 
should make a tree structure that accomodates different ast parsing/ asset object creation depending on the file type
should support all the file types that the bundlers support
WEBPACK
  raw-loader Loads raw content of a file (utf-8)
  val-loader Executes code as module and consider exports as JS code
  url-loader Works like the file loader, but can return a data URL if the file is smaller than a limit
  file-loader Emits the file into the output folder and returns the (relative) URL
  JSON 
  json-loader Loads a JSON file (included by default)
  json5-loader Loads and transpiles a JSON 5 file
  cson-loader Loads and transpiles a CSON file
  Transpiling 
  script-loader Executes a JavaScript file once in global context (like in script tag), requires are not parsed
  babel-loader Loads ES2015+ code and transpiles to ES5 using Babel
  buble-loader Loads ES2015+ code and transpiles to ES5 using Bublé
  traceur-loader Loads ES2015+ code and transpiles to ES5 using Traceur
  ts-loader or awesome-typescript-loader Loads TypeScript 2.0+ like JavaScript
  coffee-loader Loads CoffeeScript like JavaScript
  fengari-loader Loads Lua code using fengari
  Templating 
  html-loader Exports HTML as string, require references to static resources
  pug-loader Loads Pug templates and returns a function
  jade-loader Loads Jade templates and returns a function
  markdown-loader Compiles Markdown to HTML
  react-markdown-loader Compiles Markdown to a React Component using the markdown-parse parser
  posthtml-loader Loads and transforms a HTML file using PostHTML
  handlebars-loader Compiles Handlebars to HTML
  markup-inline-loader Inline SVG/MathML files to HTML. It’s useful when applying icon font or applying CSS animation to SVG.
  twig-loader Compiles Twig templates and returns a function
  Styling 
  style-loader Add exports of a module as style to DOM
  css-loader Loads CSS file with resolved imports and returns CSS code
  less-loader Loads and compiles a LESS file
  sass-loader Loads and compiles a SASS/SCSS file
  postcss-loader Loads and transforms a CSS/SSS file using PostCSS
  stylus-loader Loads and compiles a Stylus file
  Linting && Testing 
  mocha-loader Tests with mocha (Browser/NodeJS)
  eslint-loader PreLoader for linting code using ESLint
  jshint-loader PreLoader for linting code using JSHint
  jscs-loader PreLoader for code style checking using JSCS
  coverjs-loader PreLoader to determine the testing coverage using CoverJS
  Frameworks 
  vue-loader Loads and compiles Vue Components
  polymer-loader Process HTML & CSS with preprocessor of choice and require() Web Components like first-class modules
  angular2-template-loader Loads and compiles Angular Components
*/
function createAsset(filename) {
  filename = path.join('./', filename);

  // goal is to see how we will eventually need to process each file/what loaders may be necessary
  // Read file to see 1) what the file type and  2) what dependencies it has

  // should have different paths in the try catch based on what filetype is being processed.
  // should also make sure the method of traversal we are using is correct, a la node mostly, i.e. that the way we are looking for things with extensions vs without is appropriate to the way node or other protocols look for the various files that are being parsed as dependencies
  let filetype = path.extname(filename);
  const id = ID++;
  let dependencies = [];
  const nodePath = path.join(__dirname, 'node_modules');
  const nodeModuleDependencies = { core: [], npm: [] };
  let content;
  let unresolved = false;
  // get content if fileextension is provided
  if (filetype) {
    content = fs.readFileSync(filename, 'utf-8');
    // account for situations where extension is missing. we still want to match any files that do exist with that name if they exist
  } else {
    // if it is a relative, path, go there and try to grab file
    if (filename.includes('/')) {
      //NOTE: currently just grab first match. that might not be ideal in situations with multiple extsnison matches (e.g. 'file1.js file1.css, gile1.txt etc.)
      let [matchingFile] = glob.sync(filename + '.*');
      // here, if no file matches, we basically check to see if inserting an underscore after the last '/' (as is done with partials)
      // gives a matching file. if so, we use that
      if (!matchingFile) {
        const lastSlashIndex = filename.lastIndexOf('/');
        filename =
          filename.substring(0, lastSlashIndex + 1) + '_' + filename.substring(lastSlashIndex + 1);
        matchingFile = glob.sync(filename + '.*')[0];
      }
      if (matchingFile) {
        filename = matchingFile;
        filetype = path.extname(filename);
        content = fs.readFileSync(matchingFile, 'utf-8');
      } else {
        unresolved = true;
      }
    }
    // check if filename/dependency is a node core module. (possible this shouldnt be first step. think of case where you aren't using node, and you have a )
    else if (isBuiltinModule(filename)) {
      // if so, no need to process it in any way? might need to make sure a 'require' style loader isn't necessary.
      //probably just add add to node dependencies
      // might be irrelevant since some core modules like fs will never work in browser. might also just indicate a necessary loader (a node-loader)
      nodeModuleDependencies.npm.push(filename);
    }
    // now check if it is a module
    else if (false) {
      // haven't added this yet
    } else {
      unresolved = true;
    }
  }
  //probably need to do this traversal differently depending on what types of files can do anything that links a dependency
  // right now, only handling javascript and scss/less/sass/stylus
  // to do this, need to look at importdeclatation function with node.source.value and see which ones fit the module pattern (whatever it technically is);
  let ast;
  let code;

  if (
    filetype === '.scss' ||
    // currently my folder just has sass/scss, so not sure how less and stylus. work. not sure if their partials includes the extension, or requires the invisible '_' in the file anames (but not in the import statement). Code below will change depending
    filetype === '.sass' /*  || filetype === '.less' || filetype === '.styl' */
  ) {
    let ast;
    ast = cssTree.parse(content);
    cssTree.walk(ast, node => {
      //this can't actually be necessary
      if (
        node.type === 'Atrule' &&
        node.prelude &&
        node.prelude.children &&
        node.prelude.children.head &&
        node.prelude.children.head.data
      ) {
        //duplicate code, need to make it work completely using one or other (cssTree or CSSOM. postcss may be best)
        let importPath = node.prelude.children.head.data.value
          //they include single quotes, so i get rid of these
          .slice(1, node.prelude.children.head.data.value.length - 1);
        if (!importPath.includes('/')) importPath = './' + importPath;
        // i do not currently append .scss or .sass since i don't know how to tell the difference
        dependencies.push(importPath);
      }
    });
    code = content;
  } else {
    // might be able to add a try catch here that figures out what presets are necessary if any are. try to parse, if you can't, do a readfile and see what things are inside
    ast = babylon.parse(content, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'flow',
        'asyncFunctions',
        'classConstructorCall',
        'doExpressions',
        'trailingFunctionCommas',
        'objectRestSpread',
        'decorators',
        'classProperties',
        'exportExtensions',
        'exponentiationOperator',
        'asyncGenerators',
      ],
    });
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        const { value } = node.source;
        const nodeModulePath = path.join(nodePath, value);
        if (fs.existsSync(nodeModulePath) || fs.existsSync(nodeModulePath + '.js')) {
          nodeModuleDependencies.npm.push(value);
        } /* if (value[0] === '.' || value[0] === '/') */ else {
          dependencies.push(value);
        }
      },
    });
    code = babel.transformFromAst(ast, null, {
      presets: ['env'],
    }).code;
  }
  // console.log('​filename', filename);
  // console.log('​dependencies', dependencies);
  // console.log('​filetype', filetype);
  dependencies = dependencies.map(x => {
    if (x[0] === '.' && x[1] === '/') x = x.slice(2);
    return x;
  });
  return {
    id,
    filename,
    dependencies,
    // code,
    nodeModuleDependencies,
    filetype,
    unresolved,
  };
}

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];
  for (const asset of queue) {
    asset.mapping = {};
    const dirname = path.dirname(asset.filename);

    asset.dependencies.forEach(relativePath => {
      // remove any ./ or / from the file. if we actually use the dependency mapping, we can just remove the same from the actual require statements
      const absolutePath = path.join(dirname, relativePath);
      const child = createAsset(absolutePath);
      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}

function bundle(graph) {
  let modules = '';
  graph.forEach(mod => {
    modules += `${mod.id}: [
         function(require, module, exports) {
           ${mod.code}
          },
          ${JSON.stringify(mod.mapping)},
    ],`;
  });
  const result = `
    (function(modules) {
      function require(id) {
        const [fn, mapping] = modules[id];
        function localRequire(relativePath) {
          return require(mapping[relativePath])
        }
        const module = {exports: {} };
        fn(localRequire, module, module.exports);

        return module.exports
      }
      require(0);
    })({${modules}})
  `;
  return result;
}
const graph = createGraph('./src/index.js');
console.log('​graph', graph);

// const result = bundle(graph);
