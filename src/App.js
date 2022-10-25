import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import  { useState,useEffect } from 'react';
import { Doquery } from './utilities/fetch';


function App() {
  const [called,setCalled] = useState(false);
  const [term, setTerm] = useState("Fall");
  // const [courses,setCourses] = useState([]);
  const [selected,setSelect] = useState([]);




  let response = Doquery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  // console.log("response:",response);


  useEffect(()=>{
    console.log("selected:",selected);
  },[selected])



    
  
    if(response.isLoading){
        return  <div className="App">
        {/* <Banner term={term} setTerm={setTerm}></Banner> */}
        <h1>Loading data</h1>
        </div>
    }
  
    if(response.error){
        // console.log(response.error.message) ;
    }
    if(response.data){
      // setData(response.data);
      // setCalled(true);
      // console.log(response.data);
      return (
        <div className="App">
          <Banner term={term} setTerm={setTerm} selected={selected}></Banner>
    
          <CourseList data={response.data} term={term} selected={selected} setSelect={setSelect}></CourseList>
    
          
        </div>
      );
  
    }
  



  

  }

  

  



export default App;
