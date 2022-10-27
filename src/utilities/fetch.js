import {useQuery} from "@tanstack/react-query";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from "firebase/database";


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
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const dbRef = ref(database);


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



// const querydata = async (url) =>{
//     return await fetch(url)
//     .then((rsp) => {
//         if(!rsp.ok){
//             throw new Error("network response not ok");
//         }
//         return rsp.json();

//     })

// }

// export const Doquery = (url) => {
    
//         const {isLoading,isError,data,error} = useQuery(["courses"],()=> querydata(url));
//         return {data,isLoading,error};
    

// }