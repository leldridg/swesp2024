const queries = require('../database/queries');


// this function takes a username and generates a session_id for this user.
// inserts into table the session_id and user_id

function generateToken(username, callback) {
  queries.idByUsername(username, (err, user_id) => {
    if (err) { return callback(err, null) }

    const generateRandomAlphanumeric = length => Array.from({ length }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))).join('');

    let sess = generateRandomAlphanumeric(20);

    // remove the token if it exists
    queries.removeToken(user_id, (err) => {
      if (err) { return callback(err, null) }
    });

    // it should really never be unique.
    queries.checkTokenUnique(sess, (err, valid) => {
      if (err) { return callback(err, null) }
      if (valid) {

        queries.insertToken(sess, user_id, (err) => {
          if (err) { console.log(err); }
        });
        callback(null, sess);
      } else {
        callback(null, null);
      }
    });
  });
}

module.exports = { generateToken }