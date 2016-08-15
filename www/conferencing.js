/*
 * Tropo Learning Lab - Conferencing
 * Level: Intermediate
 * todo: figure out how to have the app call someone and place them into conference
 * Create an outbound call application that accepts passed parameters, including the numberToDial
 * and the conferenceID, like this: Then launch the app twice, using a REST request (either a GET
 * or a POST), passing in a different phone number each time, but the same conference ID. This doc
 * page explains the REST request portion: https://www.tropo.com/docs/rest/starting_session.htm
 * https://support.tropo.com/hc/en-us/community/posts/203466443-call-people-into-conference
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/confconfig.json"));

var conferenceID;
var token = myConfig.token;

makeConfID();

addPeople();

function makeConfID(){
    ask("Enter a 4-digit number to use as the conference ID",
        {
            choices: "[4 DIGITS]",
            onChoice: function(event){
                conferenceID = parseInt(event.value);
            }
        });
}
function addPeople(){
    var shouldAdd = true;
/*
    while (shouldAdd === true) {
*/
        ask("Enter a 10-digit number of someone to add to the conference.",
            {
                choices: "[10 DIGITS]",
                onChoice: function (event) {
                    addPerson(event.value,conferenceID);
                }
            });

/*        ask("Would you like to add another person?",{
            choices: "yes,no",
            onChoice: function(event){
                if(event.value === "no"){
                    shouldAdd = false;
                }
            }
        });*/
/*    }*/

}

function addPerson(numberToDial,conferenceID){
    say("Calling them now.");
    var url = "https://api.tropo.com/1.0/sessions?action=create&token="+token+"&numberToDial=+1"+numberToDial+"&conferenceID="+conferenceID;
    log("@@url: " + url);
    connection = new java.net.URL(url).openConnection();
    connection.setDoOutput(false);
    connection.setDoInput(true);
    connection.setInstanceFollowRedirects(false);
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Content-Type", "text/plain");
    connection.setRequestProperty("charset", "utf-8");
    connection.connect();
}


//file loading function.
function load_json(url) {
    var line;
    var returnJSON = "";
    connection = new java.net.URL(url).openConnection();
    connection.setDoOutput(false);
    connection.setDoInput(true);
    connection.setInstanceFollowRedirects(false);
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Content-Type", "text/plain");
    connection.setRequestProperty("charset", "utf-8");
    connection.connect();

    var dis = new java.io.DataInputStream(connection.getInputStream());
    while (dis.available() != 0) {
        line = dis.readLine();
        returnJSON += line;
    }
    return returnJSON;
}