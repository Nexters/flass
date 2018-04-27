module.exports = {
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    "modulePaths": [
        "client"
    ],
    "testRegex": "(/__tests__/.*|\\.(test))\\.js?$",
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg|woff|woff2)$": "<rootDir>/client/__mocks__/fileMock.js",
        // Plain CSS - match css files that don't end with '.module.css' https://regex101.com/r/VzwrKH/4
        "^(?!.*\\.module\\.css$).*\\.css$": "<rootDir>/client/__mocks__/styleMock.js",
        // CSS Modules - match files that end with 'module.css'
        "\\.module\\.css$": "identity-obj-proxy" // CSS modules
    },
    "moduleFileExtensions": [
        "jsx",
        "js"
    ],
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/.cache/"],
    setupTestFrameworkScriptFile: "./client/config/setupTests.js",
    globals: {}
};