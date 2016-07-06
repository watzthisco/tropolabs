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
                say("I see that your name is " + currentCall.callerName);
            }
            say("Your caller ID is " + currentCall.callerID);


        } else {
            say("I'm calling today to tell you some information about my call to you today.");
            if(currentCall.network === 'SIP'){
                say("I see that your name is " + currentCall.calledName);
            }
        }
        say("Your caller ID is " + currentCall.calledID);
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