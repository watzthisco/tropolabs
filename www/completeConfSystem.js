/*
 * Tropo Learning Lab - Full-featured Conference Call System
 * Level: Intermediate
 * To Test: call 586-248-4893

 */

// conference IDs and phone numbers to alert.
// If a conference ID is used that has a phone number attached,
// when someone joins or leaves that conference, the attached phone
// number will get an SMS alerting them.

var pins = {"1234":"14075551212", "1337":"19255556789", "2600":""};

answer();

while (currentCall.isActive){
    var response = ask("Enter your conference ID. Press the pound key when finished.", {
        choices:"[3-10 DIGITS]",
        terminator: "#",
        mode: "keypad",
        timeout: 8,
        onBadChoice: function(){
            say("Sorry, that's not a valid conference ID");
        },
        onChoice: function(event){
            say('<speak>Conference ID <say-as interpret-as="vxml:digits">' + event.value + '</say-as> accepted. You will now be placed into the conference. Press pound to exit without disconnecting. Please announce yourself.</speak>');
            conference(event.value,{terminator: "#"});

            // Send an alert that someone has left the conference
            message(currentCall.callerID + ' has left conference ' . event.value, {to: pins[event.value], network: 'SMS'});
            },
        onTimeout: function(){
                say("Sorry, I didn't hear anything");
        }


    });
}