/*
 * Tropo Learning Lab - Interupting with Signals
 * Level: Intermediate
 * To Test:
 * Call 586-232-5981
 * Look in the Logs for 'The Session ID is ' to find out the session-id
 * Input the sessionID into this URL:
 * https://api.tropo.com/1.0/sessions/[sessionId]/signals?action=signal&value=exit
 * Open the url in a browser.
 */


var sessionid = currentCall.sessionId;
log("The Session ID is " + sessionid);
say("http://hosting.tropo.com/5055259/www/hold-music/01_Hot_Guitar.mp3", {
    allowSignals: "exit"
});

say("You are now off hold.");