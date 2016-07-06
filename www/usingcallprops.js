/*
 * Tropo Learning Lab - Using Call Props
 * Level: Beginner
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

call(myConfig.numbers[0], {
    timeout:120,
    callerID: '19168675309',
    onAnswer: function() {

        if(currentCall.isIncoming === true){
            say("Thank you for calling the incoming call information line.");
            if(currentCall.network === 'SIP'){
                var callerName = say_as(currentCall.callerName,'phone');
                say("I see that your name is " + callerName);
            }
            var callerID = say_as(currentCall.callerID,'phone');
            say("Your caller ID is " + callerID);


        } else {
            say("I'm calling today to tell you some information about my call to you today.");
            if(currentCall.network === 'SIP'){
                var calledName = say_as(currentCall.calledName,'phone');
                say("I see that your name is " + calledName);
            }
            var calledID = say_as(currentCall.calledID,'phone');
            say("Your caller ID is " + calledID);
        }

    },

    onTimeout: function() {
        log("Call timed out");
    },
    onCallFailure: function() {
        log("Call could not be completed.");
    }
});

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

function say_as(value,type){
    ssml_start="<?xml version='1.0'?><speak>";
    ssml_end="</say-as></speak>";
    ssml ="<say-as interpret-as='vxml:"+ type + "'>" + value+"";
    complete_string = ssml_start + ssml + ssml_end;
    log('@@ Say as: ' + complete_string);
    say(complete_string);
}
