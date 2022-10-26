import React, {useState,useEffect} from 'react';
import './CourseItem.css';
import {parseDT,checkConflict} from '../utilities/conflict';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const CourseItem = ({data,selected,setSelect,parsed,setParsed})=>{

        // let data = this.props.data;
        // term+num, title, time
        // console.log(data);
        
        const [active,setActive] = useState(false);
        const [no,setNo] = useState(false);
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);


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
            <TextField id="filled-basic" label="title" variant="filled" defaultValue={data.title}/>
            <TextField id="filled-basic" label="time" variant="filled" defaultValue={data.meets} />
            <Button variant="contained" onClick={handleClose}>Cancel</Button>

            </Box>
        </Modal>
        </li>

        

}

export default CourseItem;