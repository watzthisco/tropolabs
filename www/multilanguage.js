/*
 * Tropo Learning Lab - Multiple Languages
 * Level: Advanced
 * To Test: call 586-232-5952
 */


//config object
var configuration = {
    "choices":
    {
        "1":"english",
        "2":"spanish",
        "3":"german",
        "4":"japanese"
    },
    "voices":
    {
        "english":"kate",
        "spanish":"juan",
        "german":"anna",
        "japanese":"Otoya"
    },
    "messages":
    {
        "english":"Hello",
        "spanish":"Hola",
        "german":"Guten Tag",
        "japanese":"Kon'nichiwa"
    }
};


say("Hello there my international friend!");
var result = ask("What language would you like me to speak? " + listSelections(configuration.choices), {
    choices: listKeys(configuration.choices),
    attempts: 3,
    onBadChoice: function() {
        say("I'm sorry, I didn't understand that.");
    },
    onChoice: function(event) {
        var language = configuration.choices[event.value];
        var message = configuration.messages[language];
        var voiceSelected = configuration.voices[language];

        say("You said " + language + ". ");
        say(message,{voice:voiceSelected});
    }
});


//utility functions

function listSelections(config){
    var sayString = "";
    for (var choice in config) {
        if (config.hasOwnProperty(choice)) {
            sayString += "Select " + choice + " for " + config[choice] + ". ";
        }
    }
    return sayString;
}

function listKeys(config){
    var arr=[];

    for (var choice in config) {
        if (config.hasOwnProperty(choice)) {
            arr.push(choice);
        }
    }
    return arr.join(",");
}