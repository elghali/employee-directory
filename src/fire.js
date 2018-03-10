import firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFqYkbS71azIz19SGZoixw_nPcs4N_fPI",
    authDomain: "employee-directory-8879c.firebaseapp.com",
    databaseURL: "https://employee-directory-8879c.firebaseio.com",
    projectId: "employee-directory-8879c",
    storageBucket: "employee-directory-8879c.appspot.com",
    messagingSenderId: "952311688435"
  };


  var fire = firebase.initializeApp(config);
  export const employeesRef = firebase.database().ref('employees');
  export default fire;