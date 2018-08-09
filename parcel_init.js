// https://parceljs.org/api.html

// hack for production mode
process.env.NODE_ENV = 'production';

const Bundler = require('parcel-bundler');
const Path = require('path');
const fs = require('fs');

// Entrypoint file location
// const file = Path.join(__dirname, './index.html');
const file = 'C:\\Users\\sgoldber\\Documents\\Codesmith\\mockbuster\\mockbuster\\src\\index.js';

// data output location
const resultsFile = Path.join(__dirname, './parcel_results.txt');

// options
const options = {
  detailedReport: true
};

// hack to change node.js directory
process.chdir('C:\\Users\\sgoldber\\Documents\\Codesmith\\mockbuster\\mockbuster');
console.log(process.cwd());

const bundler = new Bundler(file/*, options*/);
bundler.bundle();

bundler.on('bundled', mainBundle => {
  /* basic information for JS assets: */
  
  // console.log(Array.from(Array.from(mainBundle.childBundles)[0].assets).map(asset => {
  //   return {
  //     relativeName: asset.relativeName,
  //     buildTime: asset.buildTime,
  //     bundledSize: asset.bundledSize
  //   };
  // }));
  
  /* can we obtain all bundles? */
  /* one main bundle, and (possibly) multiple child bundles from the main bundle, each of which contain assets that need conversion. */
  /* we're only going one level deep, without recursively going through the child bundles. */
  const bundles = [mainBundle].concat(Array.from(mainBundle.childBundles));
  const bundleOutputs = bundles.map(bundle => (
    Array.from(bundle.assets).map(asset => ({
      name: asset.name,
      buildTime: asset.buildTime,
      bundledSize: asset.bundledSize
    }))
  ));
  
  const output = bundleOutputs.reduce((acc, arr) => acc.concat(arr));
  
  output.forEach(asset => {
    asset.relativeName = asset.relativeName;
  });
  
  fs.writeFileSync(resultsFile, JSON.stringify(output, null, 2));
});

