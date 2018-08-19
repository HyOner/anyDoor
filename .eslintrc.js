module.exports = {
    "extends": ["eslint:recommended"],
    "rules": {
        "no-console": "warn"
    },

    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "script"

    },
    "env": {
        "node": true,
        "es6": true,
        "mocha": true
    }
}
