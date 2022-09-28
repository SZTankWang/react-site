import React, {Component} from 'react';
import './CourseItem.css';

class CourseItem extends React.Component{
    render(){
        let data = this.props.data;
        return <li>{`${data[1].term}:CS ${data[1].number}  ${data[1].title}`}</li>
    }
}

export default CourseItem;