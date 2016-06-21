/*
 * Tropo Learning Lab - Basic CSV Dialer
 * Level: Beginner
 */


// load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

// for now, just pretend we've already loaded the CSV into an object.
var numbersToDial = {"people":[
                    {"name":"Chris","number":myConfig.numbers[0]},
                    {"name":"Eva","number":myConfig.numbers[1]}
                    ]};

for (var i = 0; i<numbersToDial.people.length; i++){
var callee = numbersToDial.people[i];
call(callee.number);
say("Hi, " + callee.name);
hangup();
}

//file loading function.
function load_json(url){
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

    dis = new java.io.DataInputStream(connection.getInputStream());
    while (dis.available() != 0) {
        line = dis.readLine();
        returnJSON += line;
    }
    return returnJSON;
}