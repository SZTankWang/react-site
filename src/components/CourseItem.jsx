import React, {Component} from 'react';
import './CourseItem.css';

class CourseItem extends React.Component{
    render(){
        let data = this.props.data;
        // term+num, title, time
        console.log(data);
        return <li className= "course-card">
            <div className="course-head course">{`${data[1].term} CS ${data[1].number} `}</div>
            <div className='course-body course'>{data[1].title}</div>
            <div className="course-foot course">{data[1].meets}</div>
        </li>
    }
}

export default CourseItem;