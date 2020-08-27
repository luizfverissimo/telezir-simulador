const express = require('express');
const db = require('./database/connections');

const routes = express.Router();

routes.post('/taxes', async (req, res) => {
  const { from, to, value } = req.body;

  await db('taxes').insert({
    from,
    to,
    value,
  });

  return res.send();
});

routes.get('/taxes', async (req, res) => {
  const fromLocations = await db.distinct().from('taxes').pluck('from');
  if (!fromLocations) {
    return res.status(400).json({ message: "Um erro ocorreu!" });
  }

  return res.json(fromLocations);
});

routes.get('/taxes/:from', async (req, res) => {
  const { from } = req.params;

  const toLocations = await db('taxes').where('from', from)

  return res.json(toLocations);
});

module.exports = routes;
