import React, {Component,useEffect} from 'react';
import CourseItem from './CourseItem';
import "./CourseList.css";



const CourseList = ({data,term})=>{
    
  
        
    return (

        <div className="list-container">
        <ul>{Object.keys(data.courses).map((v,i)=>{
            if(data.courses[v].term ==term){
                return <CourseItem key={i} data={data.courses[v]}></CourseItem>

            }
    })}</ul>

    </div>
);
    

}

export default CourseList;