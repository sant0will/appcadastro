import axios from 'axios';

const api = {

  getAllUsers: (callback) => {
    axios.get('http://apicadastro.herokuapp.com/api/users')
    .then(response => {
      console.log(response.data);
      callback(response);
    }).catch((error) => { 
      console.log(error.message)
    });
    return 'Error'
  },

  saveUser: (callback, user) => {
    // console.log(user);
    fetch('http://apicadastro.herokuapp.com/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: user[0],
        last_name: user[1],
        phone: user[2],
        email: user[3],
      }),
    }).then(response => {
      callback(response);
    }).catch((error) => { 
      console.log(error.message)
    });
  }

};

export default api;