/*
 * Tropo Learning Lab - Voicemail with Transcription
 * Level: Intermediate
 * To Test: call 586-232-5973
 */

var callerID = currentCall.callerID;

say("Welcome to speed therapy!");
record("Tell us how you feel in fifteen minutes or less!", {
        beep:true,
        maxTime:900,
        recordURI:"http://example.com/recording.js",
        transcriptionOutURI: "mailto:chris@watzthis.com",
        transcriptionID:callerID
    }
);