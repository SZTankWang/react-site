import React, {useState,useEffect} from 'react';
import './CourseItem.css';
import {parseDT,checkConflict} from '../utilities/conflict';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import {write} from '../utilities/fetch';

const CourseItem = ({data,selected,setSelect,parsed,setParsed,number,setEdited})=>{

        // let data = this.props.data;
        // term+num, title, time
        // console.log(data);
        
        const [active,setActive] = useState(false);
        const [no,setNo] = useState(false);
        const [open, setOpen] = React.useState(false);
        const [dOpen,setDopen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const handleDClose = ()=> setDopen(false);
        const [title, setTitle] = React.useState(data.title);
        const [errorMessage, setErrorMessage] = React.useState("");
        const [time, setTime] = React.useState(data.meets);
        const [errorMessageT, setErrorMessageT] = React.useState("");
        const [timeLegal,setTimeLegal] = useState(true);

        const originalTitle=data.title;
        const originalTime = data.meets;

        useEffect(() => {
            // Set errorMessage only if text is equal or bigger than MAX_LENGTH
            if (title.length < 2) {
              setErrorMessage(
                "course title must be at least 2 characters"
              );
            }
          }, [title]);
          useEffect(() => {
            // Set empty erroMessage only if text is less than MAX_LENGTH
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (title.length >=2 && errorMessage) {
              setErrorMessage("");
            }
          }, [title, errorMessage]);

          useEffect(() => {
            // Set errorMessage only if text is equal or bigger than MAX_LENGTH
            const found = time.match(/\w+\s\d{2}:\d{2}-\d{2}:\d{2}/g);
            if (found==null) {
                console.log("wrong time")
              setErrorMessageT(
                "must contain days and start-end, e.g., MWF 12:00-13:20"
              );
              setTimeLegal(false);
            }
            else{
                //check legal time
                const digits = time.match(/(\d+)/g);
                // console.log(digits);
                if(digits[0]>digits[2] ){
                    // console.log("illegal time")
                    setTimeLegal(false);
                }
                if(digits[0]==digits[2]&&digits[1]>=digits[3]){
                    // console.log("illegal time")
                    setTimeLegal(false);                   
                }
                if( digits[0]>23 || digits[2]>23 || digits[1]>59 || digits[3]>59){
                    console.log("illegal time")
                    setTimeLegal(false);
                }
                else{
                    setTimeLegal(true);

                }
            }
          }, [time]);
          useEffect(() => {
            // Set empty erroMessage only if text is less than MAX_LENGTH
            // and errorMessage is not empty.
            // avoids setting empty errorMessage if the errorMessage is already empty
            if (timeLegal && errorMessageT) {
                console.log("clear time error");
              setErrorMessageT("");
            }
          }, [time, errorMessageT]);

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

        const handleSubmit = ()=>{
            //change helpertext
            // setErrorMessageT("nothing changed yet");
            //if time and title have been changed?
            // console.log("number",number);
            if(time == originalTime && title == originalTitle){
                setDopen(true);
                return
            }
            if(!timeLegal || title.length < 2){
                setDopen(true);
                return
            }
            //update data
            write(number,{"meets":time,"number":data.number,"term":data.term,"title":title}).then(rsp=>{
              setEdited(true);
              handleClose();
            });
        }
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display:"flex",
            flexDirection:"column"
          };
          
        
        return    <li className= {`course-card ${active ? "active":""} ${no ? "no":""}`}>
            <div className="course-head course">{`${data.term} CS ${data.number} `}</div>
            <div className='course-body course'>{data.title}</div>
            <div className="course-foot course">{data.meets}</div>
            <div className={`course course-button ${active ? "active-link":""}`}>
                <a onClick={handleOpen}>edit</a>
                <a onClick={()=>{setActive(active=>!active)}}>{active&&!no ? "deselect":"select"}</a>
            </div>

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <TextField 
            error={title.length < 2}
            onChange={(e) => setTitle(e.target.value)}
            helperText={errorMessage}
            id="filled-basic" label="title" variant="filled"  value={title}/>
            
            <TextField 
            error={!timeLegal}
            helperText={errorMessageT}
            onChange={(e) => setTime(e.target.value)}
            id="filled-basic" label="time" variant="filled" value={time} />
            <div className='button-container'>
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
            <Dialog
        open={dOpen}
        onClose={handleDClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Check your form. Either you havn't made changes yet or there are errors in your input
              </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDClose}>back</Button>

        </DialogActions>
      </Dialog>
            </Box>
        </Modal>
        </li>

        

}

export default CourseItem;