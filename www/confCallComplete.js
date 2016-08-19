var response = ask('Enter your conference ID. Press the pound key when finished.',
    {
        choices:'[3-10 DIGITS]',
        terminator: '#',
        mode: 'keypad',
        onChoice: function(event){
            say('Conference ID ' + event.value + 'accepted. You will now be placed into the conference.');

            conference(event.value);
        }
    });
