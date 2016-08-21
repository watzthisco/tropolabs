/*
 * Tropo Learning Lab - Auto Attendant with Data
 * Level: Advanced
 * To Test: call
 *
 * Notes: Based on https://www.tropo.com/2012/03/couchdb-sms/
 *
 */


var url = "http://watzthis.cloudant.com/sms/currentUsers";
var currentUsers = JSON.parse(load_json(url));

var sessions = currentUsers.people;

var i = 1;
var not_exit = true;
var not_found = true;

while (i < parseInt(sessions["total"])){

}



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
