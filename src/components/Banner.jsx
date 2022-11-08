
import React, {Component, useEffect} from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { signInWithGoogle, signOut, useAuthState ,queryAdmin} from '../utilities/fetch';

import "./Banner.css";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "fit-content",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const buttonStyle = {
    marginTop:16
  }



  
  
const Banner = ({term,setTerm,selected,setAdmin,verified}) =>{

    const [open, setOpen] = React.useState(false);
    const [user] = useAuthState();

    useEffect(()=>{
      if(user){
        queryAdmin(user.email,setAdmin);
      }
      else{
        setAdmin(false);
      }
    },[user]);
    const handleOpen = () => {
        
        setOpen(true)
        console.log("modal:",selected);
    };
    const handleClose = () => setOpen(false);
  

    const handleChange = (eve)=>{
        setTerm(eve.target.value);
        // console.log(eve.target.value);
    }


    const AuthButton = () => {
      
      // console.log(user);
      //query admin


      return user ? <SignOutButton /> : <SignInButton />;
    };

    const SignInButton = () => (
      <Button variant="contained" onClick={signInWithGoogle}>Sign in</Button>
    );
    
    const SignOutButton = (setAdmin) => (
      <Button variant="contained" onClick={signOut}>Sign out</Button>
    );
  
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
          <FormControlLabel data-cy="Winter" value="Winter" control={<Radio />} label="Winter" />
          <FormControlLabel value="Spring" control={<Radio />} label="Spring" />
        </RadioGroup>
      </FormControl>
      <Button onClick={handleOpen}>selected courses</Button>
      <AuthButton></AuthButton>  
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            {selected.length >0? selected.map((i,idx)=> {return <div className='course-item' key={idx}><div className='part'>{i.title}</div>
            <div className='part'>{i.number}</div>
            <div className='part'>{i.meets}</div></div>}):<h2>Nothing selected yet</h2>}
            <Button sx={buttonStyle}variant="contained"  onClick={() => {
                handleClose();
                    }}>close</Button>
        </Box>

      </Modal>

        <h1>CS Courses for 2018-2019 {term}</h1>
        </div>

    
}

export default Banner;