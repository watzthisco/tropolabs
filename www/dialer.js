/*
 * Tropo Learning Lab - Simple Dialer
 ** Level: Beginner
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var numbersToDial = [{
    name: "Mr. Jones",
    number: myConfig.numbers[0]
}, {
    name: "Mrs. Smith",
    number: myConfig.numbers[1]
}];

for (var i = 0; i < numbersToDial.length; i++) {
    call(numbersToDial[i].number, {
        onAnswer: playMessage(numbersToDial[i].name)
    });
}

function playMessage(name) {
    say("Hello, " + name + ". This is an important reminder.");
    wait(1000);
    say("Goodbye");
    wait(1000);
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