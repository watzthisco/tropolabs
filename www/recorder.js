/*
 * Tropo Learning Lab - Audio Files (playback and recording)
 * Level: Beginner
 */


//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));


say("Welcome to the message recorder!");

//generate a unique file name for the message file.
var messageFileName = Date.now() + ".mp3";

var myRecording = record("Record your 15-second message after the beep.", {
    beep: true,
    recordFormat: "audio/mp3",
    recordURI: myConfig.ftp.host + "/www/audio/" + messageFileName,
    recordUser: myConfig.ftp.user,
    recordPassword: myConfig.ftp.pass,
    maxTime: 15,
    onRecord: function () {

    }
});

say("Here's your damn message.");
//play it back with the temporary file.
say(myRecording.value);

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