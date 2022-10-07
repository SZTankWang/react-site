import React, {Component,useEffect} from 'react';
import CourseItem from './CourseItem';
import "./CourseList.css";
import { Doquery } from '../utilities/fetch';


const CourseList = ()=>{
    
    //get the data
    let response = Doquery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
    console.log("response:",response);

    if(response.isLoading){
        return "wait";
    }

    if(response.error){
        return response.error.message;
    }
    
        
    return (

        <div className="list-container">
        <ul>{Object.keys(response.data.courses).map((v,i)=><CourseItem key={i} data={response.data.courses[v]}></CourseItem>)}</ul>

    </div>
);
    

}

export default CourseList;