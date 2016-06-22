/*
 * Tropo Learning Lab - Mixing Voice and SMS
 * Level: Intermediate
 *
 * Docs:
 * This app sends a random SMS message with a message from
 * Oblique Strategies, a set of cards created by Brian Eno
 * and Peter Schmidt, which was first published in 1975.
 */

//load an external json file with settings.
var randomMessages = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/data/randomMessages.json"));

say("Thank you for calling the oblique strategies hotline.",{voice:"Victor"});
ask("Please enter a 10-digit phone number to receive a random message.", {
    voice:"Victor",
    choices: "[10 DIGITS]",
    onChoice: function(event) {
        var strategy = pickRandomFromArray(randomMessages.messages);
        message(strategy, {
            to: event.value,
            network: "SMS"
        });
        say("Your message has been sent. Goodbye.",{voice:"Victor"});
        hangup();
    },
    onBadChoice: function(event) {
        say(event.value + " is not a valid number",{voice:"Victor"});
    }
});


function pickRandomFromArray(messageArray){
    return messageArray[Math.floor(Math.random() * messageArray.length)];
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