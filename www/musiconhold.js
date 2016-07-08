/*
 * Tropo Learning Lab - Music on Hold
 * Level: Advanced
 * To Test: Call 313-462-0521
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var holdMusic = {
    improvisation: "http://luridcactus.com/Music/Whats_Really_Inside__Little_Red_King_192.mp3",
    ambient: "http://www.dokapi.de/music/dokapi-continental_drift-01-lighthouse.mp3",
    blues: "http://www.ovenmittjohnson.com/mp3s/01_Hot_Guitar.mp3"
};

say("Please select the type of music you'd like to hear while you wait for someone to answer.");
wait(500);
ask("Choose improvisation, ambient, or blues.",
    {
        choices: "improvisation, ambient, blues",
        attempts: 3,
        onBadChoice: function () {
            say("I'm sorry, I didn't get that.");
        },
        onChoice: function (event) {
            transfer(myConfig.numbers[1], {
                playvalue: holdMusic[event.value],
                onTimeout: function () {
                    say("Sorry, but nobody answered");
                }
            });
        }

    });

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