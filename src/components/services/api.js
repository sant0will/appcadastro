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

  saveUser: (callback) => {
    fetch('http://apicadastro.herokuapp.com/api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: 'tap',
        last_name: 'tap',
        phone: 'tap',
        email: 'tap',
      }),
    });
  }
};

export default api;