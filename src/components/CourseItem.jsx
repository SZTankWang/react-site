import React, {useState,useEffect} from 'react';
import './CourseItem.css';



const CourseItem = ({data,selected,setSelect})=>{

        // let data = this.props.data;
        // term+num, title, time
        // console.log(data);
        
        const [active,setActive] = useState(false);
        useEffect(()=>{
            if(active){
                console.log("add");
                setSelect([...selected,data]);

            }
            else{
                console.log("remove");
                setSelect(selected.filter((i)=>i.title!=data.title));

            }
            
        },[active]);
        
        return <li className= {active ? "course-card active":"course-card"} onClick={()=>{
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