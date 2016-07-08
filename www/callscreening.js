/*
 * Tropo Learning Lab - Call Screening
 * Level: Intermediate
 */

//load an external json file with settings.
var myConfig = JSON.parse(load_json("http://hosting.tropo.com/5055259/www/config/config.json"));

var result = ask("For sales, press 1. To talk to the manager, press 2.", {
    choices: "1,2",
    mode: "dtf",
    onChoice: function (result) {

        if (parseInt(result.value) === 1) {
            //transfer to sales
            transfer(myConfig.numbers[1], {
                playvalue: "http://www.phono.com/audio/holdmusic.mp3",
                onConnect: function (event) {
                    ask("Someone wants to talk to sales. Press 1 to accept the call, press any other key to reject.", {
                        voice: "Ava",
                        choices: "1",
                        mode: "dtmf",
                        onChoice: function (event) {
                            say("Excellent. Connecting you now.");
                        },
                        onBadChoice: function (event) {
                            say("Rejecting the call.");

                        }
                    });
                },
                onTimeout: function (event) {
                    say("Sorry, there was no answer.");
                }
            });
        } else {
            //transfer to the manager
            transfer(myConfig.numbers[0], {
                playvalue: "http://www.phono.com/audio/holdmusic.mp3",
                onConnect: function (event) {
                    ask("Someone wants to talk to the manager. Press 1 to accept the call, press any other key to reject.",
                        {
                            voice: "Ava",
                            choices: "1",
                            mode: "dtmf",
                            onChoice: function (event) {
                                say("Excellent. Connecting you now.");
                            },
                            onBadChoice: function (event) {
                                say("Rejecting the call. Goodbye.");
                                hangup();
                            }
                        }
                    );
                },

                onTimeout: function (event) {
                    say("Sorry, there was no answer.");
                }
            });
        }
    },
    onBadChoice: function (event) {
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
