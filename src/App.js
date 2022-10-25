import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import  { useState } from 'react';
import { Doquery } from './utilities/fetch';


function App() {
  const [term, setTerm] = useState("Fall");
  const [courses,setCourses] = useState([]);


  //get data
  let data;
  let response = Doquery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  console.log("response:",response);
 

  if(response.isLoading){
      console.log("wait") ;
  }

  if(response.error){
      console.log(response.error.message) ;
  }
  
  if(response.data){
    return (
      <div className="App">
        <Banner term={term} setTerm={setTerm}></Banner>
  
        <CourseList data={response.data} term={term}></CourseList>
  
        
      </div>
    );
  }

}

export default App;
