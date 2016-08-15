call('+1' + numberToDial);
say("Welcome. You will be connected to the conference call now.");
conference(conferenceID, {
    terminator: "*",
    playTones: true,
    onChoice: function(event) {
        say("Disconnecting");
    }
});
say ("Goodbye");