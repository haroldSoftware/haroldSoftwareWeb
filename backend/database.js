//==============================================================================

let sqlite3 = require("sqlite3");
let database = new sqlite3.Database("./database.db");

//==============================================================================

const createRegister = `CREATE TABLE IF NOT EXISTS register (
  username TEXT UNIQUE,
  password TEXT UNIQUE,
  email TEXT
)`;

const create_3_D_objs = `CREATE TABLE IF NOT EXISTS three_D_objs (
  username TEXT,
  height INTEGER,
  width INTEGER,
  depth INTEGER
)`;

//==============================================================================

database.run(createRegister, (error) => {
  if (error) {
    console.error(new Error ("Create REGISTER table failed: "), error);
  }
  else {
    console.log("Create REGISTER success");
  }
});

database.run(create_3_D_objs, (error) => {
  if (error) {
    console.error(new Error (`Create OBJECTS failure: `), error);
  }
  else {
    console.log("Create OBJECTS success");
  }
})

//==============================================================================

module.exports = database;

//==============================================================================
