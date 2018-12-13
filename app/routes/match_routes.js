var ObjectID = require('mongodb').ObjectID;
const collection = 'matches'

module.exports = function(app, db) {
  /* GET MATCHES */
	app.get('/matches', (req, res) => {
    db.collection(collection).find({}).toArray((err, items) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(items);
      }
    });
  });

  /* ADD MATCHES */
  app.post('/matches', (req, res) => {
    const matches = { todo: req.body.todo, completed: req.body.completed };
    db.collection(collection).insert(matches, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  /* UPDATE MATCHES */
  app.put('/matches/:id', (req, res) => {
    const id = req.params.id
    const details = { '_id': new ObjectID(id) };
    const matches = { todo: req.body.todo, completed: req.body.completed };
    db.collection(collection).update(details, matches, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(matches);
      }
    });
  });

  /* DELETE ALL MATCHES */
  app.put('/matches/delete/all', (req, res) => {
    console.log('test')
    db.collection(collection).remove(details, (err, {}) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('All matches deleted!');
      } 
    });
  })
};