/*
 * Tropo Learning Lab - Voicemail with Transcription
 * Level: Intermediate
 * To Test: call 586-232-5973
 */


//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var config = [
    {"department":"sales","phone":myConfig.numbers[0],"email":myConfig.email},
    {"department":"service","phone":myConfig.numbers[0],"email":myConfig.email}];

var callerID = currentCall.callerID;
var result = ask(listSelections(config), {
    choices: listKeys(config),
    mode: "dtml",
    onChoice: function (result) {

        say("Transferring.");
        var userInput = parseInt(result.value);

        switch (userInput) {
            case 0:
                transferCall(userInput);

                break;

            case 1:
                transferCall(userInput);

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

function transferCall(dept){
    transfer(config[dept].phone, {
        timeout: 15,
        playvalue: "http://www.phono.com/audio/holdmusic.mp3",
        onTimeout: function () {
            say("Thank you for calling " + config[dept].department + ". We're not available right now.");
            record("Please record a message after the beep.", {
                    beep:true,
                    maxTime:30,
                    transcriptionOutURI: "mailto:"+config[dept].email,
                    transcriptionID:callerID
                }
            );
        }
    });
}

function listSelections(config){
    var sayString = "";
    for (var i=0; i<config.length; i++){
        sayString += "Select " + i + " for " + config[i].department + ". ";
    }
    return sayString;
}

function listKeys(config){
    var arr=[];

    for (var i=0; i<config.length; i++) {
        arr.push(i);
    }
    return arr.join(",");
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