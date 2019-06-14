import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.dev.config.js';


const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html'),
    compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
        }
    )
);

app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
    })
  });

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api/v1/', (request, response) => {
    let errorMessage = "";

    const {number1, number2, operation} = request.body;
 
    //const req = JSON.parse(request.body);
    console.log(request.body);


    if (number1 !== undefined && number2 !== undefined && operation !== undefined) {
        if (typeof number1 === "number" && typeof number2 === "number"  ) {
            if (operation !== "multiply") {
                errorMessage = "Current API supports only multiply operation";
            } 
        } else {
            errorMessage = "One of the arguments not numbers";
        }
    } else {
        errorMessage = "One of argument is missing or invalid";
    }

    if (errorMessage){
        response.json({
            "code": 500,
            "error": errorMessage
        })
    } else {
        response.json({
            "code": 200,
            "data": {"result": number1 * number2}
        })
    }
});

app.post('/api/v1', (request, response) => {
    response.send('Hello');
});

app.use(express.static('public'));

app.listen(3000, () => {
    console.log('Listen!!!');
});

/*{
    "number1": 1,
    "number2": 2,
    "operation": "multiply"
}

{
    "code": 200,
    "data": {"result": 2},
    "error": ""
}*/
