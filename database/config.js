const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

module.exports = () =>
  open({
    filename: "./yam.db",
    driver: sqlite3.Database,
  });
