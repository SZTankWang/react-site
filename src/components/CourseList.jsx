// import React, {Component,useEffect} from 'react';
import CourseItem from './CourseItem';
import "./CourseList.css";



const CourseList = ({data,term,selected,setSelect})=>{
    

        
    return (

        <div className="list-container">
        <ul>{Object.keys(data.courses).map((v,i)=>{
            if(data.courses[v].term ==term){
                return <CourseItem key={i} data={data.courses[v]} selected={selected} setSelect={setSelect} ></CourseItem>

            }
    })}</ul>

    </div>
);
    

}

export default CourseList;