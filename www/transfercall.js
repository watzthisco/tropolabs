/*
 * Tropo Learning Lab - Transferring a Call
 * Level: Beginner
 */


//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var result = ask("To hear a chemistry joke, press 1. To be transferred to WatzThis, press 2.", {
    choices: "1,2",
    mode: "dtml",
    onChoice: function (result) {

        say("Transferring.");
        var userInput = parseInt(result.value);

        switch (userInput) {
        case 1:
            transfer("+13134516844", {
                onTimeout: function () {
                    say("Sorry, there was no answer.");
                }
            });
            break;

        case 2:
            transfer(myConfig.numbers[1], {
                onTimeout: function () {
                    say("Sorry, there was no answer.");
                }
            });
            break;

        default:
            say("I don't know how you got to this message.");
            break;
        }

    },
    onBadChoice: function () {
        say("That is not a valid option");
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