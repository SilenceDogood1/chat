import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config.js';
import {getMessages, create} from './database.js';

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
        }
    )
);

app.use(webpackHotMiddleware(compiler, {
    publicPath: config.output.publicPath
  }));

app.use(webpackHotMiddleware(compiler));

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api/v1/',  (request, response) => {
    return getMessages().then(result => {
        const resultToSend = result.map(item => {
            const sender = item.dataValues.sender;
            const text = item.dataValues.text;
            const time = item.dataValues.createdAt;
            const message = {sender, text, time};
            
            return message;
        })
        response.send(resultToSend);
     })
});

app.post('/api/v1', (request, response) => {
    const text = request.body.message;
    create(text);
    response.status(200).end()
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Listen!!!');
});


// Database

const db = require('../../src/server/database');


// Gig routes
app.use('/gigs', require('../routes/gigs'));
