/*
 * Tropo Learning Lab - Auto Attendant with Data
 * Level: Intermediate
 * TODO: make it get data from a CouchDB database to populate menu and get responses.
 * To Test: call 313-451-6844
 */

var chemistJokes = [
    "Don't trust atoms, they make up everything.",
    "Have you heard the one about a chemist who was reading a book about helium? He just couldn't put it down.",
    "Why do chemists like nitrates so much? They're cheaper than day rates.",
    "What do you do with a sick chemist? If you can't helium, and you can't curium, then you might as well barium.",
    "What did the scientist say when he found 2 isotopes of helium? HeHe",
    "Why was the mole of oxygen molecules excited when he walked out of the singles bar? He got Avogadro's number!",
    "Old chemists never die, they just stop reacting.",
    "If you're not part of the solution, you're part of the precipitate.",
    "Two chemists go into a restaurant. The first one says 'I think I'll have an H2O.' The second one says 'I think I'll have an H2O too' -- and he died."
];

say("Thank you for calling the Chemistry Joke Hotline.");
say("Please hold on while I pick a joke for you.");
wait(1000);
say("Ok, here it is:");
var joke = chemistJokes[Math.floor(Math.random()*chemistJokes.length)];
wait(1000);
say(joke);
wait(3000);
say("Goodbye.");
wait(1000);
    