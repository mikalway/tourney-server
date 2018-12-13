var ObjectID = require('mongodb').ObjectID;
const collection = 'players'
module.exports = function(app, db) {
  /* GET ALL PLAYERS */
	app.get('/players', (req, res) => {
    db.collection(collection).find({}).toArray((err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
    });
  });

  /* GET SPECIFIC PLAYER */
  app.get('/players/:id', (req, res) => {
  	const id = req.params.id
    const details = { '_id': new ObjectID(id) };
    db.collection(collection).findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  /* ADD PLAYER */
  app.post('/players', (req, res) => {
    const player = { name: req.body.name };
    db.collection(collection).insert(player, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  /* DELETE PLAYER */
  app.delete('/players/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection(collection).remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Player ' + id + ' deleted!');
      } 
    });
  });

  /* UPDATE PLAYER */
  app.put('/players/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const player = { name: req.body.name };
    db.collection(collection).update(details, player, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(player);
      } 
    });
  });
};