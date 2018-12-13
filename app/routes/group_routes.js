var ObjectID = require('mongodb').ObjectID;
const collection = 'groups'

module.exports = function(app, db) {
  /* GET GROUPS */
	app.get('/groups', (req, res) => {
    db.collection(collection).find({}).toArray((err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
    });
  });

  /* ADD TEAM */
  app.post('/groups', (req, res) => {
    const groups = { a: req.body.a, b: req.body.b, c: req.body.c, d: req.body.d };
    db.collection(collection).insert(groups, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  /* UPDATE GROUPS */
  app.put('/groups/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) };
    const groups = { a: req.body.a, b: req.body.b, c: req.body.c, d: req.body.d };
    db.collection(collection).update(details, groups, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(groups);
      }
    });
  });
};