const express = require('express');
const path = require('path');
const fetch = require('isomorphic-fetch');
const url = require('url');
const app = express();
const port = 5001
const weatherAPIkey='b3be04b180315cb3de8d3a0dee5975cc'


app.get('/diagnostic', (req, res) => {
  res.status(200).send("OK");
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/weather', (req, res) => {
  let cityName = url.parse(req.url,true).query['city'];
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherAPIkey}&units=Imperial`)
  .then(response => response.json())
  .then(data => {
    res.json({"weather": data.weather[0], "detail": data.main, "name": data.name})
  })
})

app.listen(port, () => {
  console.log(`City Weather app listening on port: ${port}`);
})