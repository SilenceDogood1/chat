import express from 'express';
import calculator from './calculator';
const app = express();
    

app.use(express.json()) // for parsing application/json

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api/v1/', (request, response) => {
    let errorMessage = "";

    
app.post('/api/v1', (request, response) => {
    response.send('Hello');
});

app.use(express.static('public'));

