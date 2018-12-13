const playerRoutes = require('./player_routes');
const teamRoutes = require('./team_routes');
const groupRoutes = require('./group_routes');
const matchRoutes = require('./match_routes');

module.exports = function(app, db) {
  playerRoutes(app, db);
  teamRoutes(app, db);
  groupRoutes(app, db);
  matchRoutes(app, db);
};