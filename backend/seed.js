//==============================================================================

const db = require("./database.js");

//==============================================================================

//==============================================================================
//:::::::::::::::::::::::::::::::LOGIN_DATA:::::::::::::::::::::::::::::::::::::
//==============================================================================

const registerData = [
  {username: "firstUser", password: "password", email: "hello@aol.com"}
];

//==============================================================================
//:::::::::::::::::::::::::::::::OBJECTS_DATA:::::::::::::::::::::::::::::::::::
//==============================================================================

const objectData = [
  {username: "firstUser", height: 3, width: 3, depth: 3}
];

//==============================================================================
//:::::::::::::::::::::::::::::::::DELETERS:::::::::::::::::::::::::::::::::::::
//==============================================================================

const deleteRegister = `DELETE FROM register`;

const deleteObjects = `DELETE FROM three_D_objs`;

//==============================================================================
//::::::::::::::::::::::::::::::::INSERTERS:::::::::::::::::::::::::::::::::::::
//==============================================================================

const insertIntoRegister = `INSERT INTO register (username, email, password)
  VALUES (?, ?, ?)`;

const insertIntoObjects = `INSERT INTO  three_D_objs
  (username, height, width, depth)
  VALUES (?, ?, ?, ?)`;

//==============================================================================

db.run(deleteRegister, (error) => {
  if (error) {
    console.error(new Error ("Failed to del regs"));
  }
  else {
    registerData.forEach(register => {
      db.run
      (
        insertIntoRegister,
        [register.username, register.password, register.email],
        error => {
          if (error) {
            console.error(new Error ("Failed to insert regs", error));
          }
          else {
            console.log("Successfully inserted regs");
          }
        }
      )
    });
    db.run(deleteObjects, (error) => {
      if (error) {
        console.error(new Error ("Failed to del objs"), error);
      }
      else {
        objectData.forEach(object => {
          db.run
          (
            insertIntoObjects,
            [object.username, object.height, object.width, object.depth],
            error => {
              if (error) {
                console.error(new Error ("Failed to insert objs"), error);
              }
              else {
                console.log("Successfully inserted objs");
              }
            })
        })
      }
    })
  }
})


//==============================================================================
