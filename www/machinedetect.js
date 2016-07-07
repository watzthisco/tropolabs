/*
 * Tropo Learning Lab - Answering Machine Detection
 * Level: Intermediate
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

call(myConfig.numbers[0], {
    timeout:30.0,
    machineDetection:{introduction: "Verifying human or machine...please hold while we figure it out."},
    onAnswer: function(event) {
      say("Detected" + event.value.userType);
      
      if (event.value.userType === "MACHINE") {
        say ("Answering machine detected.");
      }
      
    },
    onTimeout: function(event) {
        say("Sorry, there was no answer.");
    },
    onBadChoice: function(event) {
        say("That is not a valid option");
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