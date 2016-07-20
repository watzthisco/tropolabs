/*
 * Tropo Learning Lab - Multiple Languages
 * Level: Advanced
 * To Test: call 586-232-5952
 */


//config object
var configuration = [
    {"language":"english","recognizer":"en-us","voice":"kate","message":"Hello","question":"Please count to four."},
    {"language":"spanish","recognizer":"es-es","voice":"juan","message":"Hola","question":"Por favor, contar hasta cuatro."},
    {"language":"german","recognizer":"de-de","voice":"anna","message":"Guten Tag","question":"Bitte zählen zu vier."},
    {"language":"french","recognizer":"fr-fr","voice":"Aurelie","message":"Bonjour","question":"S'il vous plaît compter jusqu'à quatre."}
];

say("Hello there my international friend!");
var result = ask("What language would you like me to speak? " + listSelections(configuration), {
    choices: listKeys(configuration),
    attempts: 3,
    mode: "dtmf",
    onBadChoice: function() {
        say("I'm sorry, I didn't understand that.");
    },
    onChoice: function(event) {
        var language = configuration[event.value].language;
        var message = configuration[event.value].message;
        var voiceSelected = configuration[event.value].voice;
        var question = configuration[event.value].question;
        var recognizer = configuration[event.value].recognizer;

        say("You said " + language + ". ");
        say(message,{voice:voiceSelected});

        ask(question, {
            voice: voiceSelected,
            choices:"[4 DIGITS]",
            mode:"speech",
            recognizer:recognizer,
            onChoice: function(event) {
                say(event.value, {voice:voiceSelected});
            }

        })

    }
});

function splitString(str){
    var letterList = str.split("");
    return letterList.join(",");
}

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
    return arr.join(" ");
}