/*
 * Tropo Learning Lab - Full-featured Conference Call System
 * Level: Intermediate
 * To Test: call 586-248-4893

 */

// conference IDs and phone numbers to alert.
// If a conference ID is used that has a phone number attached,
// when someone joins or leaves that conference, the attached phone
// number will get an SMS alerting them.

var pins = {'1234':'19167305777', '1337':'19255556789', '2600':''};

while (currentCall.isActive) {

    var response = ask('Enter your conference ID. Press the pound key when finished.',
        {
            choices: '[3-10 DIGITS]',
            terminator: '#',
            mode: 'keypad',
            timeout: 8,
            onBadChoice: function () {
                say("Sorry, that's not a valid conference ID");
            },
            onTimeout: function () {
                say("Sorry, I didn't hear anything");
            },
            onChoice: function (event) {
                if (!pins[event.value]) {

                    say('Sorry, that is not a valid conference ID.');

                } else {

                    if (pins[event.value] != '') {
                        message(currentCall.callerID + ' has entered conference ' + event.value + '.',
                            {
                                to: pins[event.value], network: 'SMS'
                            });
                    }
                    say('<speak>Conference ID <say-as interpret-as="vxml:digits">' + event.value + '</say-as> accepted. You will now be placed into the conference. Press pound to exit without disconnecting. Please announce yourself.</speak>');

                    conference(event.value, {terminator: "#"});

                    if (pins[event.value] != '') {
                        message(currentCall.callerID + ' has left the conference ' + event.value + '.',
                            {
                                to: pins[event.value], network: 'SMS'
                            });
                    }

                }
            }
        });

    wait(1);
}
