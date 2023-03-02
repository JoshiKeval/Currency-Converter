const path = require("path");
const rootDir = path.resolve(__dirname);
module.exports = Object.assign({
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  rootDir,
  modulePaths: [rootDir],
});
