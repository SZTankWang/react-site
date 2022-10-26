// first we need to parse date and time

// second we check its date and time against existing coursees

export const parseDT = (time)=>{
    //time is in the format of MWF 9:00-9:50
    // first split by space
    let split_ = time.split(" ");
    let dates = split_[0];
    let times = split_[1];
    // console.log(dates);
    //split time by "-"
    let start_time = times.split("-")[0];
    let end_time = times.split("-")[1];
    //get rid of the ":"
    start_time = parseInt(start_time.replace(":",""));
    end_time = parseInt(end_time.replace(":",""));
    // console.log(start_time,end_time);
    let on_time = [];
    on_time.push(start_time);
    on_time.push(end_time);

    //parse dates
    let date_list = ["M","Tu","W","Th","F"];
    let on_date = [];
    date_list.map(i=>{
        if(dates.includes(i)){
            on_date.push(i);
        }
    })
    return [on_date,on_time];


}

export const checkConflict= (parsed,new_)=>{
    //check new_ against parsed
    //first check dates
    // let conflict = false
    // return Object.keys(parsed).map((course)=>{
    //     //get this dates
    //     return parsed[course][0].map((date)=>{
    //         if(new_[0].includes(date)){
    //             //continue to check time
    //             //confict:  new's end time >= this start time && n<= this end time
    //             console.log("new end time:",new_[1][1],"parsed end time:",parsed[course][1][1]);
    //             if(new_[1][1]>=parsed[course][1][0] && new_[1][1]<=parsed[course][1][1]){
    //                 console.log("conflict!");
    //                 return true;
    //             } 
    //         }
    //     })
    //     return false;
    // return false;

    // })
    let courses = Object.keys(parsed);
    for(let i=0;i<courses.length;i++){
        console.log("course length",courses.length);
        //get dates
        let dates = parsed[courses[i]][0];
        // console.log("dates",dates,"new",new_[0]);
        for(let j=0;j<dates.length;j++){
            if(new_[0].includes(dates[j])){
                // console.log("include");
                if(new_[1][1]>=parsed[courses[i]][1][0] && new_[1][1]<=parsed[courses[i]][1][1]){
                    console.log("conflict!");
                    return true;
            }
        }
    }

        
    }
    return false;
}

// export default parseDT;