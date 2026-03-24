module.exports = {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/mocks/fileMock.js",
    },
    setupFilesAfterEnv: ['./setupTest.js'],
    testEnvironment: 'jest-environment-jsdom',
    testEnvironmentOptions: {
        "customExportConditions": ["node", "node-addons"],
    },
    testMatch: ["<rootDir>/../../tests/unit/**/*.test.js"],
    roots: ["<rootDir>", "<rootDir>/../../tests"],
    moduleDirectories: ["node_modules", "<rootDir>/node_modules"],
    transformIgnorePatterns: [
        "/node_modules/(?!(@fullcalendar|preact)/)"
    ]
};
