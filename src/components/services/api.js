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

//   services: (callback) => {
//     //186.225.11.114
//     axios.get('http://192.168.0.23/apiapp/public/api/servicos')
//     .then(response => {
//       console.log('response: '+response);
//       callback(response.data.data);
//     }).catch((error) => { 
//       console.log(error.message)
//     });
//     return 'Error'
//   },

};

export default api;