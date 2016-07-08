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
        "java": true


    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
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