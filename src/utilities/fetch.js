// import {useQuery} from "@tanstack/react-query";
import { initializeApp,getApps,getApp } from 'firebase/app';
import { getDatabase, ref, child, get, set,onValue,connectDatabaseEmulator } from "firebase/database";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut,connectAuthEmulator,signInWithCredential } from 'firebase/auth';
import { useState,useEffect } from 'react';

// import {getFunctions} from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyCgrf1V3iGvSd3R6qqxIPaEx9H2__lLZRA",
    authDomain: "wp2ws-week10.firebaseapp.com",
    databaseURL: "https://wp2ws-week10-default-rtdb.firebaseio.com",
    projectId: "wp2ws-week10",
    storageBucket: "wp2ws-week10.appspot.com",
    messagingSenderId: "376710954688",
    appId: "1:376710954688:web:609fc4d89c6ce40dd57725",
    measurementId: "G-H839LQKZTG"
  };


  // Initialize Firebase
  const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp(); 
// const app = initializeApp(firebaseConfig);

// const functions = getFunctions(app);

const database = getDatabase(app);

const dbRef = ref(database);

const auth = getAuth(app);

if (process.env.REACT_APP_EMULATE) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(auth, GoogleAuthProvider.credential(
    '{"sub": "Wh7KPUxXcfz8mH9dOGfkKZJvAr0S", "email": "zw1806@nyu.edu", "displayName":"zhenming test", "email_verified": true}'
  ));
}

export const getData = ()=>{
    return get(child(dbRef, `course-data`)).then((snapshot) => {
        if (snapshot.exists()) {
        //   console.log(snapshot.val());
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
      
}


export const listenToUpdate = (setCourses)=>{
  const courseRef = ref(database,"course-data/courses/");
    onValue(courseRef,(snapshot)=>{
    console.log("updated:",snapshot.val());
    if(snapshot.val()!=null){
      console.log("setting courses",snapshot.val());
      setCourses(snapshot.val());
    }
    // setCourses(snapshot.val());
    // return snapshot.val();
  })
}

export const write = (course,newData)=>{
  return set(ref(database,"course-data/courses/"+course),newData);
}


export const signInWithGoogle = (setAdmin) => {
  signInWithPopup(getAuth(app), new GoogleAuthProvider());
};

const firebaseSignOut = () => {
  signOut(getAuth(app))
  // setAdmin(false);
};

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();
  
  useEffect(() => (
    onAuthStateChanged(getAuth(app), setUser)
  ));

  return [user];
};

export const queryAdmin = (name,setAdmin)=>{
  get(child(dbRef, "admin")).then((snapshot) => {
    if (snapshot.exists()) {
      console.log("admin",snapshot.val());
      //find admin
      // const all = Object.keys(snapshot.val());
      // console.log("all",all);
      if(name == snapshot.val()){
        setAdmin(true);
        // setV(true);
      }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  
}