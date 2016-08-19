/*
 * Tropo Learning Lab - Call Screening with Voicemail
 * Level: Intermediate
 * To Test: call 586-232-5974
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var people = [
    {"name":"Eddy","phone":myConfig.numbers[0]},
    {"name":"Julie","phone":myConfig.numbers[1]}];

// Set callerID to callerName if present, otherwise set to callerID
var callerID = currentCall.callerName || currentCall.callerID;
log("@@callername: " + currentCall.callerName);

var result = ask(listSelections(people), {
    choices: listKeys(people),
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

function transferCall(person){
    transfer(people[person].phone, {
        playvalue: "http://www.phono.com/audio/holdmusic.mp3",
        onConnect: function () {
            say("Call from:");
            say(say_as(callerID,"phone"));
            ask("Press 1 to accept the call, press 2 to send to voicemail.", {
                voice: "Ava",
                choices: "1,2",
                mode: "dtmf",
                onChoice: function (event) {
                    var choice = parseInt(event.value);
                    if (choice === 1) {
                        say("Excellent. Connecting you now.");
                    }
                    if (choice === 2) {
                        say("Sending to voicemail");
                        // this doesn't work. It's just connecting the call anyway.
                        // somehow I need to just hang up the callee and then move on
                        // to the sendToVoicemail function.
                        sendToVoicemail(person);
                        hangup();
                    }
                },
                onBadChoice: function () {
                    say("I don't understand.");

                }
            });
        },
        onTimeout: function () {
            say("Sorry, there was no answer.");
        }
    });
}

function sendToVoicemail(person){
    var messageFileName = currentCall.callerID + "-" + Date.now() + ".mp3";
    record("Please record a message for " + person + " after the beep. Press pound when finished.", {
        beep:true,
        maxTime:60,
        terminator:'#',
        recordFormat: "audio/mp3",
        recordURI: myConfig.ftp.host + "/www/audio/"+ config[person].name + "/" + messageFileName,
        recordUser: myConfig.ftp.user,
        recordPassword: myConfig.ftp.pass
    });

}
function listSelections(config){
    var sayString = "";
    for (var i=0; i<config.length; i++){
        sayString += "To speak with " + config[i].name + ", press " + i + ". ";
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
