import express from 'express';
import bodyParser from'body-parser';
import path from 'path';
import Routes from './config/Route';

let app = express();
let port = process.env.PORT || 5020;
app.use(process.env.API_BASE_PATH, Routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(port);
console.log('server is runnning at ' + port);