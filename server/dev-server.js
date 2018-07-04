const path = require('path');
const express = require('express');

const User = require('../db/users.js');

const app = express();
const publicPath = path.join(__dirname, '../public/dist');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
// app.get('/getdata', (req, res) => {
//   res.send('hi');
//   User.find({}, (err, data) => {
//     console.log(data);
//     res.send(data);
//   });
// });
app.get('*', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

app.listen(port, () => console.log(`server running on port ${port}...`));
