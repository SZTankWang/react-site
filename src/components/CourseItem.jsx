import React, {Component} from 'react';
import './CourseItem.css';

class CourseItem extends React.Component{
    render(){
        let data = this.props.data;
        // term+num, title, time
        // console.log(data);
        return <li className= "course-card">
            <div className="course-head course">{`${data.term} CS ${data.number} `}</div>
            <div className='course-body course'>{data.title}</div>
            <div className="course-foot course">{data.meets}</div>
        </li>
    }
}

export default CourseItem;