const Kue = require('kue');
const queue = Kue.createQueue();

const express = require('express');
const ui = require('kue-ui');
const app = express()

ui.setup({
    apiURL: '/api', //important specifying the api url
    baseURL: '/kue', // important specifying the base url
    updateInterval: 5000 //optional : fetch new data every 5000ms
})

//mount kue json api
app.use('/api', Kue.app)

//mount UI
app.use('/kue', ui.app)

app.listen(5000);

console.log('listening on port 5000')