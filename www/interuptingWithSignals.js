var sessionid = currentCall.sessionId;
log("The Session ID is " + sessionid);
say("http://www.phono.com/audio/holdmusic.mp3", {
    allowSignals: "exit"
});

say("You are now off hold.");