
import React, {Component} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "./Banner.css";

const Banner = ({term,setTerm}) =>{

    const handleChange = (eve)=>{
        setTerm(eve.target.value);
        // console.log(eve.target.value);
    }


    


        return <div className='banner-wrapper'>
        <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Term</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChange}

        >
          <FormControlLabel value="Fall" control={<Radio />} label="Fall" />
          <FormControlLabel value="Winter" control={<Radio />} label="Winter" />
          <FormControlLabel value="Spring" control={<Radio />} label="Spring" />
        </RadioGroup>
      </FormControl>
        <h1>CS Courses for 2018-2019 {term}</h1>
        </div>

    
}

export default Banner;