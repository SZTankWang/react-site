import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import  { useState,useEffect } from 'react';
import { getData,listenToUpdate} from './utilities/fetch';


function App() {
  const [courses,setCourses] = useState(null);
  const [called,setCalled] = useState(false);
  const [term, setTerm] = useState("Fall");
  // const [courses,setCourses] = useState([]);
  const [selected,setSelect] = useState([]);
  const [edited,setEdited] = useState(false);

  //store parsed time
  const [parsed,setParsed] = useState({});

  useEffect(()=>{
    console.log("selected:",selected);
  },[selected])

  useEffect(()=>{
    console.log("parsed:",parsed);
  },[parsed]);

  // useEffect(()=>{
    
  //   const data =getData();
  //   data.then((rsp)=>{
  //     console.log(rsp);
  //     setCourses(rsp);
  //   })
  // },[])

  useEffect(()=>{
    const data = listenToUpdate(setCourses);
    console.log("data",data);
  },[])

  // let response = Doquery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  // console.log("response:",response);

  //get from firebase
  
  // console.log(data);
  let course_list;
  if(courses ){
    course_list = <CourseList data={courses} term={term} selected={selected} setSelect={setSelect} parsed={parsed} setParsed={setParsed} setEdited={setEdited}></CourseList>

  }
  else{
    course_list = "loading data"
  }
    return (
      <div className="App">
        <Banner term={term} setTerm={setTerm} selected={selected}></Banner>
        {course_list}

      </div>
    );
    


    
  
    // if(response.isLoading){
    //     return  <div className="App">
    //     {/* <Banner term={term} setTerm={setTerm}></Banner> */}
    //     <h1>Loading data</h1>
    //     </div>
    // }
  
    // if(response.error){
    //     // console.log(response.error.message) ;
    // }

      // setData(response.data);
      // setCalled(true);
      // console.log(response.data);

  
    
  



  

  }

  

  



export default App;
