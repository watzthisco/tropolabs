/*
 * Tropo Learning Lab - Call Screening
 * Level: Intermediate
 * To Test: call 586-232-5936
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var config = [
    {"dept":"sales","phone":myConfig.numbers[0]},
    {"dept":"service","phone":myConfig.numbers[1]}];

// Set callerID to callerName if present, otherwise set to callerID
var callerID = currentCall.callerName || say_as(currentCall.callerID,"phone");

var result = ask(listSelections(config), {
    choices: listKeys(config),
    mode: "dtml",
    onChoice: function (result) {

        say("Transferring.");
        var userInput = parseInt(result.value);
        transferCall(userInput);
    },
    onBadChoice: function () {
        say("That is not a valid option");
    }
});

function transferCall(dept){
    transfer(config[dept].phone, {
        playvalue: "http://www.phono.com/audio/holdmusic.mp3",
        onConnect: function () {
            ask("Call from: " + callerID + ". Press 1 to accept the call, press any other key to reject.", {
                voice: "Ava",
                choices: "1",
                mode: "dtmf",
                onChoice: function () {
                    say("Excellent. Connecting you now.");
                },
                onBadChoice: function () {
                    say("Rejecting the call.");

                }
            });
        },
        onTimeout: function () {
            say("Sorry, there was no answer.");
        }
    });
}

function listSelections(config){
    var sayString = "";
    for (var i=0; i<config.length; i++){
        sayString += "Select " + i + " for " + config[i].dept + ". ";
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

function say_as(value,type){
    log("@@ The first character is: " + value.charAt(0));

    if (value.charAt(0) === 43){ // look for leading + and remove it
        value = value.substring(1);
    }

    log("@@ The value is: " + value);
    var ssml_start="<?xml version='1.0'?><speak>";
    var ssml_end="</say-as></speak>";
    var ssml ="<say-as interpret-as='vxml:"+ type + "'>" + value + "";
    var complete_string = ssml_start + ssml + ssml_end;
    log("@@ Say as: " + complete_string);
    return complete_string;
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
