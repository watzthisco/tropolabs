/*
 * Tropo Learning Lab - Multiple Languages
 * Level: Advanced
 * To Test: call 586-232-5952
 */


//config object
var configuration = [
    {"language":"english","voice":"kate","message":"Hello"},
    {"language":"spanish","voice":"juan","message":"Hola"},
    {"language":"german","voice":"anna","message":"Guten Tag"},
    {"language":"japanese","voice":"Otoya","message":"Kon'nichiwa"}
];

say("Hello there my international friend!");
var result = ask("What language would you like me to speak? " + listSelections(configuration), {
    choices: listKeys(configuration),
    attempts: 3,
    onBadChoice: function() {
        say("I'm sorry, I didn't understand that.");
    },
    onChoice: function(event) {
        var language = configuration[event.value].language;
        var message = configuration[event.value].message;
        var voiceSelected = configuration[event.value].voice;

        say("You said " + language + ". ");
        say(message,{voice:voiceSelected});
    }
});


//utility functions

function listSelections(config){
    var sayString = "";
    for (var i=0; i<config.length; i++){
        sayString += "Select " + i + " for " + config[i].language + ". ";
    }
    return sayString;
}

function listKeys(config){
    var arr=[];

    for (var i=0; i<config.length; i++) {
        arr.push(i);
    }
    return arr.join(",");
}