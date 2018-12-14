var ObjectID = require('mongodb').ObjectID;
const collection = 'teams'

module.exports = function(app, db) {

  /* GET ALL TEAMS */
	app.get('/teams', (req, res) => {
    db.collection(collection).find({}).toArray((err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
    });
  });

  /* GET SPECIFIC TEAM */
  app.get('/teams/:id', (req, res) => {
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

  /* ADD TEAM */
  app.post('/teams', (req, res) => {
    const team = { 
      name: req.body.name, 
      playerId1: req.body.playerId1, 
      playerId2: req.body.playerId2,
      image: req.body.image,
      backupImage: req.body.backupImage
    };
    db.collection(collection).insert(team, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  /* DELETE TEAM */
  app.delete('/teams/:id', (req, res) => {
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
 
  /* UPDATE TEAM */
  app.put('/teams/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const team = { 
      name: req.body.name, 
      playerId1: req.body.playerId1, 
      playerId2: req.body.playerId2,
      image: req.body.image,
      backupImage: req.body.backupImage
    };
    db.collection(collection).update(details, team, (err, result) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(team);
      } 
    });
  });
};