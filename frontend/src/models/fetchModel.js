//============================================================================//

const endPointHome = `http://localhost:3300/`;
const endPointRegister = `http://localhost:3300/register`;
const endPointLogin = `http://localhost:3300/login`;
const endPointObjects = `http://localhost:3300/three_D_objs`;

//============================================================================//
//===============================Web_Routes_Below===============================
//============================================================================//
/*
const endPointHome = `http://api.haroldSoftware.com/`;
const endPointRegister = `http://api.haroldSoftware.com/register`;
const endPointLogin = `http://api.haroldSoftware.com/login`;
const endPointObjects = `http://api.haroldSoftware.com/three_D_objs`;
*/
//============================================================================//

class FetchModel {

  static all = () => {
    return fetch(endPointHome)
      // return a promise with response.json() that we can use to load todos from the DB in frontend components
      .then(response => response.json())
      .catch(err => console.log('Could not get data \n', err));
  };

//============================================================================//

//============================================================================//
//::::::::::::::::::::::::::::::::LOGINS:::::::::::::::::::::::::::::::::::::://
//============================================================================//

  static createRegister = (input1) => {
    return fetch(endPointRegister, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input1)
    })
      .then(response => response.json())
      .catch(err => console.error('Sorry no data here[fetchModel]', err));

  }

//============================================================================//

  static deleteRegisters = (input1) => {
    // debugger;
    return fetch(`http://localhost:3300/register/${input1.oid}`, {
      method: "DELETE",
    })
      // .then(response => response.json())
      .catch(err => console.error(`Something is broken...`, err));
  };

//============================================================================//

  static updateRegisters = (input1) => {
    return fetch(`http://localhost:3300/register/${input1.oid}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input1)
    })
      .then(response => response.json())
      .catch(err => console.error('Sorry no data here', err));
  }

//============================================================================//

  static loginUser = (creds) => {
    console.log("creds", creds);
    return fetch(endPointLogin, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(creds)
    })
      .then(response => response.json())
      // deserialize json object into std js obj
      .catch(err => console.error('Sorry no data here[fetch-login]', err));
  }

  static getUserInfo = (creds) => {
  return fetch(endPointLogin, {
    method: "GET",
    mode: "cors",
    headers: {
      'authorization': 'Bearer ${localstorage.uid}'
    },
  })
    .then(response => response.json())
    .then(data => {
      this.setState({
        rowid: data.rowid,
        username: data.user[0].username,
        email: data.user[0].email
      })
    })
    .catch(err => console.error('Sorry no data here[login-info]', err));
}

//============================================================================//

//============================================================================//
//:::::::::::::::::::::::::::::::::OBJECTS:::::::::::::::::::::::::::::::::::://
//============================================================================//

static createObjects = (input1) => {
  return fetch(endPointObjects, {
    method: "POST",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input1)
  })
    .then(response => response.json())
    .catch(err => console.error('Sorry no data here', err));
}

//============================================================================//

};

export default FetchModel;

//============================================================================//
