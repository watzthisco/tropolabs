/*
 * Tropo Learning Lab - Interupting with Signals
 * Level: Intermediate
 * To Test:
 * call 586-232-5981
 * input the sessionID into this URL: https://api.tropo.com/1.0/sessions/<session-id>/signals
 * Open the url in a browser.
 */


var sessionid = currentCall.sessionId;
log("The Session ID is " + sessionid);
say("http://www.phono.com/audio/holdmusic.mp3", {
    allowSignals: "exit"
});

say("You are now off hold.");