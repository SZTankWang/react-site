// import React, {Component,useEffect} from 'react';
import CourseItem from './CourseItem';
import "./CourseList.css";



const CourseList = ({data,term,selected,setSelect,parsed,setParsed,setEdited,admin})=>{
    

        
    return (

        <div className="list-container">
        <ul>{Object.keys(data).map((v,i)=>{
            if(data[v].term ==term){
                return <CourseItem key={i} number={v}data={data[v]} selected={selected} setSelect={setSelect} parsed={parsed} setParsed={setParsed} setEdited={setEdited} admin={admin}></CourseItem>

            }
    })}</ul>

    </div>
);
    

}

export default CourseList;