import firebase from 'firebase';

export default {
  init: () => {
    // console.log(firebase);
    firebase.initializeApp({
      apiKey: 'AIzaSyDdFJKoVQTL_EgUcy0BOQFaVGEk1fktPrU',
      authDomain: 'myspace-c3805.firebaseapp.com',
      databaseURL: 'https://myspace-c3805.firebaseio.com',
      projectId: 'myspace-c3805',
      storageBucket: 'myspace-c3805.appspot.com',
      messagingSenderId: '757274443049'
    });
  }
};
