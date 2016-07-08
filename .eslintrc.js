module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "ask": true,
        "call": true,
        "transfer": true,
        "say": true,
        "conference": true,
        "wait": true,
        "connection": true,
        "currentCall": true,
        "log": true,
        "java": true,
        "hangup": true,
        "record": true,
        "message": true


    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": 0,
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "nocomment": 0
    }
};