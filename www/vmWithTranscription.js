/*
 * Tropo Learning Lab - Voicemail with Transcription
 * Level: Intermediate
 * To Test: call 586-232-5973
 */


//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var callerID = currentCall.callerID;
var result = ask("For sales, press 1. For service, press 2.", {
    choices: "1,2",
    mode: "dtml",
    onChoice: function (result) {

        say("Transferring.");
        var userInput = parseInt(result.value);

        switch (userInput) {
            case 1:
                transfer(myConfig.numbers[0], {
                    timeout: 15,
                    onTimeout: function () {
                        say("Thank you for calling sales. We're not available right now.");
                        record("Please record a message after the beep.", {
                                beep:true,
                                maxTime:30,
                                transcriptionOutURI: "mailto:"+myConfig.email,
                                transcriptionID:callerID
                            }
                        );
                    }
                });
                break;

            case 2:
                transfer(myConfig.numbers[0], {
                    timeout: 15,
                    onTimeout: function () {
                        say("Thank you for calling service. We're not available right now.");
                        record("Please record a message after the beep.", {
                                beep:true,
                                maxTime:30,
                                transcriptionOutURI: "mailto:"+myConfig.email,
                                transcriptionID:callerID
                            }
                        );
                    }
                });
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