const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  console.log('event', event);

  events.push(event);

  axios
    .post('http://posts-clusterip-srv:4000/events', event)
    .catch((err) => console.log('error', 'error send post event'));

  axios
    .post('http://comments-srv:4001/events', event)
    .catch((err) => console.log('error', 'error send comments event'));

  axios
    .post('http://query-srv:4002/events', event)
    .catch((err) => console.log('error', 'error send query event'));

  axios
    .post('http://moderation-srv:4003/events', event)
    .catch((err) => console.log('error', 'error send moderation event'));

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => console.log('Listening on port 4005'));
