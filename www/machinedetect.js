/*
 * Tropo Learning Lab - Answering Machine Detection
 * Level: Intermediate
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

call(myConfig.numbers[0], {
    timeout:30.0,
    machineDetection:{introduction: "Please hold for an important message."},
    onAnswer: function(event) {

        log("@@ Detected User Type: " + event.target.userType);

        switch(event.target.userType){

            case "MACHINE":
                say ("Answering machine detected.");
                log ("@@ Answerer was a " + event.target.userType);
                doMachineThings();
                break;
            case "HUMAN":
                say ("Human detected.");
                log ("@@ Answerer was a " + event.target.userType);
                doHumanThings();
                break;
            case "FAX":
                say ("Fax detected.");
                log ("@@ Answerer was a " + event.target.userType);
                doFaxThings();
                break;
            default:
                say ("I don't know what I'm talking to.");
                break;
        }

    },
    onTimeout: function(event) {
        say("Sorry, there was no answer.");
    },
    onBadChoice: function(event) {
        say("That is not a valid option");
    }
});

function doMachineThings() {
    say ("I'm sorry I missed you. Please call me back when you can.");
}

function doHumanThings() {
    say ("Hello! It's so good to talk to another real human.");

}

function doFaxThings() {
    say ("The 80s called. They want their office equipment back.")
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