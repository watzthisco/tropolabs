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
var conferenceID;





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
    while (shouldAdd === true) {
        ask("Enter a 10-digit number of someone to add to the conference.",
            {
                choices: "[10 DIGITS]",
                onChoice: function (event) {
                    addPerson(event.value,conferenceID);
                }
            });

        ask("Would you like to add another person?",{
            choices: "yes,no",
            onChoice: function(event){
                if(event.value === "no"){
                    shouldAdd = false;
                }
            }
        });
    }

}

function addPerson(numberToDial,conferenceID){
    var url = "https://api.tropo.com/1.0/sessions?action=create&token="+config.token+"&numberToDial="+numberToDial+"&conferenceID="+conferenceID;

    connection = new java.net.URL(url).openConnection();
    connection.setDoOutput(false);
    connection.setDoInput(true);
    connection.setInstanceFollowRedirects(false);
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Content-Type", "text/plain");
    connection.setRequestProperty("charset", "utf-8");
    connection.connect();

    /*var dis = new java.io.DataInputStream(connection.getInputStream());
    while (dis.available() != 0) {
        line = dis.readLine();
        returnJSON += line;
    }
    return returnJSON;*/
}