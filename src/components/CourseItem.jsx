import React, {useState,useEffect} from 'react';
import './CourseItem.css';
import {parseDT,checkConflict} from '../utilities/conflict';


const CourseItem = ({data,selected,setSelect,parsed,setParsed})=>{

        // let data = this.props.data;
        // term+num, title, time
        // console.log(data);
        
        const [active,setActive] = useState(false);
        const [no,setNo] = useState(false);
        useEffect(()=>{
            if(active){
                console.log("add");

                //parse time
                let new_parsed = parseDT(data.meets);
                //now we have the parsed time, compare it to selected courses
                //parsed is an object, course:[[date],[time]]    
                let conflict = checkConflict(parsed,new_parsed);
                // console.log("conflict",conflict);
                // console.log(parsed);
                if(!conflict){
                    setSelect([...selected,data]);
                    let key = data.title;
                    new_parsed = {[key]:new_parsed};
                    setParsed(parsed=>({...parsed,...new_parsed}));
                }
                else{
                    setNo(no=>true);
                    console.log("should turn red");
                }


            }
            else{
                // console.log("remove");
                setSelect(selected.filter((i)=>i.title!=data.title));
                //remove from parsed object
                if(data.title in parsed){
                    let new_parsed = {...parsed};
                    delete new_parsed[data.title];
                    setParsed(parsed => new_parsed);
                }
                setNo(no=>false);
                // console.log("parsed",parsed);
                
            }
            
        },[active]);

        // useEffect(()=>{
        //     if(no){

        //     }
        // },[no])
        
        return    <li className= {`course-card ${active ? "active":""} ${no ? "no":""}`} onClick={()=>{
            //if is already active, remove from selected
            setActive(active =>!active);

            //else, add to selected



            }}>
            <div className="course-head course">{`${data.term} CS ${data.number} `}</div>
            <div className='course-body course'>{data.title}</div>
            <div className="course-foot course">{data.meets}</div>
        </li>

        

}

export default CourseItem;