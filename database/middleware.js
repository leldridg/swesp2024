
const queries = require('./queries');


async function userIDfromSession(session_id){

    try {

    await queries.userIDfromSession(session_id, (err,result) => {
        if(err) { console.log(err); }
        console.log(result);
        console.log("this ran!");
        return(result);
    });
    } catch (err) {
        console.error(err); // Handle any errors here
    }

}




module.exports = { userIDfromSession }

