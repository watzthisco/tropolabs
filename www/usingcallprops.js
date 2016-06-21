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
            wait(1000);
            say("Helium walks into a bar. The bartender says We don't serve noble gasses in here. Helium doesn't react.");
            wait(1000);
            say("He he");
            wait(1000);
            log("Told them a joke.");
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