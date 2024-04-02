const queries = require('../database/queries');

//this function takes a session token (session_id)
//determines if the session_id is valid (1st boolean)
//if the session_id is valid, it also determines if the associated token belongs to an admin (2nd boolean)
//callback: err, exists, is_admin

function isTokenAdmin(session_id, callback) {
    queries.uidFromSID(session_id, (err, exists, user_id) => {
        if (err) { return callback(err, null, null) }

        //if user_id doesn't exist in session table, can't use it to check account table
        //assume user doesn't exist in account table
        if (!exists) { return callback(err, false, null) }

        queries.adminFromUID(user_id, (err, exists, is_admin) => {
            callback(err, exists, is_admin) //only line that is needed given error handling in function?
        });
    });
}

module.exports = { isTokenAdmin }