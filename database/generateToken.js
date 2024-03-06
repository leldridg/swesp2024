const queries = require('../database/queries');

function generateToken(username, callback) {

  queries.idByUsername(username, (err, result) => {
    if (err) { return callback(err, null)}

    const generateRandomAlphanumeric = length => Array.from({ length }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))).join('');

    let sess = generateRandomAlphanumeric(20);

    // remove the token if it exists
    queries.removeToken(result.user_id, (err) => {
      if (err) { return callback(err, null)}
    });

    // it should really never be unique.
    queries.checkTokenUnique(sess, (err, valid) => {
      if (err) { return callback(err, null)}
      if (valid) {

        queries.insertToken(sess, result.user_id, (err) => {
          if (err) { console.log(err); }
        });
        console.log(`/?session=${sess}`);
        callback(null, sess);
      } else {
        console.log('non unique token created');
      }
    });
  });
}

module.exports = { generateToken }