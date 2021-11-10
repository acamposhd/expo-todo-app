// Import firebase
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration, you have to paste here the object that comes from firebase
const firebaseConfig = {
  // apiKey: "AIzaSyAQOKnJ6Vn4NuND1Aq_EyllXIDU4Gee-QU",
  // authDomain: "fir-auth-6a664.firebaseapp.com",
  // databaseURL: "https://fir-auth-6a664-default-rtdb.firebaseio.com",
  // projectId: "fir-auth-6a664",
  // storageBucket: "fir-auth-6a664.appspot.com",
  // messagingSenderId: "452342722562",
  // appId: "1:452342722562:web:c39e635bcf5541dacfb71b",

  apiKey: "AIzaSyCXROA_RmQbiyzjaj7owb4GqtNaRcSCT40",
  authDomain: "test-2fd80.firebaseapp.com",
  databaseURL: "https://test-2fd80-default-rtdb.firebaseio.com",
  projectId: "test-2fd80",
  storageBucket: "test-2fd80.appspot.com",
  messagingSenderId: "232413232627",
  appId: "1:232413232627:web:0630b013f7c0a329262686",
};

// Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
// const storage = firebase.storage();
const database = firebase.database();

export { auth, database, firebase };
