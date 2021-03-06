//import * as dateView from './dateView'


class Stopwatch{
    constructor(id,time,duration){
        this.id = id;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.time = time
        this.interval=undefined;
        this.duration = duration;
        this.active = 0;
        
    }

    increment(){
        let secout="";
        let minout="";
        let hrout="00";
        //update
        this.second++;

        //determine seconds, update minutes if necessary
        if(this.second==60){
            this.second=0;
            this.minute++;
        }

        //format seconds
        if(this.second<10){
            secout=`0${this.second}`;
        }//^^^^ are exclusive VVVV
        if(this.second>=10){
            secout=`${this.second}`;
        }

        //determine minutes, update hours if necessary
        if(this.minute==60){
            this.minute=0;
            this.hour++;
        }

        //format minutes
        if(this.minute<10){
            minout=`0${this.minute}`;
        }// ^^^^ are exclusive VVVV
        if(this.minute>=10){
            minout=`${this.minute}`;
        }
		if(this.hour<10){
            hrout=`0${this.hour}`;
        }
		if(this.hour>=10){
            hrout=`${this.hr}`;
        }
        const out = `${hrout}:${minout}:${secout}`;
        
        const targethr = Number(this.duration.split(':')[0])
        const targetmin = Number(this.duration.split(':')[1])
        
        if (this.hour==targethr && this.minute==targetmin && this.second==0){
            //alert(`Activity ${this.id}, Times up!`);
            let activityname = findActivity(this.id)
            //displays notification to user
            alertMessage(`Activty ${activityname} is complete!`)
            //changes activity row color to mark completion
            document.getElementById(`${this.id}`).classList.add('table-primary')
            //plays sound to user informing of activity completion
            document.getElementById('sound').play();
            //show snooze button to silence music
            document.getElementById('snoozebtn').style.display = "inline"
            
            //marks activity as finished to reflect changes in database
            document.getElementById(`finish_${this.id}`).value='1'
            //turns 'on' finish button to reflect finish status to user
            document.getElementById(`finishbutton_${this.id}`).classList.add('active');
            //current time column will turn red to signal time is over target time
            document.getElementById(`time_${this.id}`).classList.remove('text-success');
            document.getElementById(`time_${this.id}`).classList.add('text-danger');
            
        }
        //document.getElementById('sound').play();
        return out;
        
        
    }
    //inserts end time
    start(){//start(id) maybe add default value when initializing
        if(!this.interval || !this.active){
            
            let previous_time = this.time;
            this.hour = Number(previous_time.split(':')[0]);
            this.minute = Number(previous_time.split(':')[1]);
            this.second = Number(previous_time.split(':')[2]);

            this.active=1;//show pause button
            
            //maybe send post request to server to change actitivty to active status

            document.getElementById(`start_${this.id}`).style = "display: none";//hide start
            document.getElementById(`pause_${this.id}`).style = "display: flexbox";
            document.getElementById(`time_${this.id}`).classList.add('active');
            
            
            this.interval = setInterval(()=>{
                this.time = this.increment();
                document.getElementById(`time_${this.id}`).value = this.time;
            }, 1000);

        }
        //this.interval = setInterval(() =>increment(this.id), 1000);
        
        
        

    }

    pause(){
        if(this.interval){
            this.active=0;
            document.getElementById(`start_${this.id}`).style = "display: flexbox";//show start
            document.getElementById(`pause_${this.id}`).style = "display: none";//hide pause
            document.getElementById(`time_${this.id}`).classList.remove('active');
            //get all classes of stopwatch. classlist will contain active if sotpwatch is counting
            snooze();
            clearInterval(this.interval);
        }
    }
    stop(){
        if(this.interval){
            this.active=0;
            
            clearInterval(this.interval);
            snooze();
            this.reset();
        }
    }
    reset(){
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.active=0;
        this.time='00:00:00';
        
        
        this.interval=null;
    }
    

    updateDOM(){
        
        document.getElementById(`time_${this.id}`).innerHTML = `${this.hour}:${this.minute}:${this.second}`;
    }
    
}//class Stopwatch

function snooze(){
    //silences song and resets it to beginning
    document.getElementById('sound').pause();
    document.getElementById('sound').currentTime = 0;
    //hide the btn when its clicked on
    document.getElementById('snoozebtn').style.display = 'none';

}

function stopwatchControl(){
    
    populateVisualActivities();
    
    let stopwatches = {}
    //create stopwatches for every activity
    document.querySelectorAll('.date_row').forEach(row =>{
        const time = document.getElementById(`time_${row.id}`).value
        const duration=document.getElementById(`duration_${row.id}`).value;
        
        stopwatches[`stopwatch_${row.id}`]= new Stopwatch(row.id,time,duration)
    });
    
    //activate any stopwatch that is supposed to be active
    document.querySelectorAll('.activate').forEach(stopwatch =>{
        if(Number(stopwatch.value)==1){//0 is not active 1 is active
            let id = stopwatch.id.split('_')[1]//time_12 = "12"
            stopwatches[`stopwatch_${id}`].start()
        }
    });
    
    
    document.querySelector('.date_table').addEventListener('click', event=>{
        
        //every activity has an active property to establish which activity is currently running on page load
        //1 - active
        //0 - not active
        if(event.target.id && event.target.id.split('_')[0]=='start'){
            
            stopwatches[`stopwatch_${event.target.id.split('_')[1]}`].start();//uses id from event target to link with appropriate stopwatch
            document.getElementById(`active_${event.target.id.split('_')[1]}`).value="1";
            //stopwatch.start()
            
            //stopwatch.interval = setInterval(() =>stopwatch.increment(stopwatch.id), 1000);
            //let x = setInterval(sw.increment,1000);
        }
        if(event.target.id && event.target.id.split('_')[0]=='stop'){
            event.preventDefault();//stopping typical server call
            let stopwatch= stopwatches[`stopwatch_${event.target.id.split('_')[1]}`];
            let aid = event.target.id.split('_')[1];
            let link = document.getElementById(`go_${aid}`).href.split('edit')[1].split('/');
            let dateid = link[link.length-1];
            document.getElementById(`time_${stopwatch.id}`).value = `00:00:00`;
            document.getElementById(`time_${stopwatch.id}`).classList.remove('active');
            document.getElementById(`time_${stopwatch.id}`).classList.add('text-success');
            document.getElementById(`time_${stopwatch.id}`).classList.remove('text-danger');
            document.getElementById(`pause_${stopwatch.id}`).style = "display: none";//hide pause
            document.getElementById(`start_${stopwatch.id}`).style = "display: flexbox";//show start
            document.getElementById(`finish_${stopwatch.id}`).value = "0";//mark as ongoing
            document.getElementById(`finishbutton_${stopwatch.id}`).classList.remove('active');//mark as ongoing
            document.getElementById(stopwatch.id).classList.remove('table-primary');
            stopwatch.stop();//clearInterval(stopwatch.interval);
            clearAJAX(dateid,aid);
            
        }
        if(event.target.id && event.target.id.split('_')[0]=='pause'){
            event.preventDefault();
            let aid = event.target.id.split('_')[1];
            let stopwatch= stopwatches[`stopwatch_${aid}`];
            document.querySelectorAll('.activate').forEach(hiddeninput =>{
                if(hiddeninput.id.split('_')[1]==event.target.id.split('_')[1]){//swtiches activation value 
                    document.getElementById(`active_${event.target.id.split('_')[1]}`).value="0"
                    
                }
            });
            
            stopwatch.pause();//clearInterval(stopwatch.interval);
            //new VVVVVVVVVVVVVVVVVVVV
            let link = document.getElementById(`go_${aid}`).href.split('edit')[1].split('/');
            let dateid = link[link.length-1];
            pauseAJAX(dateid,aid);
            //new ^^^^^^^^^^^^^^^^^^
            
        }
        //if(event.target.id && event.target.id.split('_')[0]=='remove'){
        //    //remove on event.target.id.split('_')[1]==the id to remove
        //    data.activities.forEach(activity =>{
        //        if (activity.id == event.target.id.split('_')[1]){
        //            dateView.clearActivity(activity);
        //        }
        //    });
            
        //}
    })

    

}

//grab values of start and end times based on activity id in dataset
//updates values of activity viusal clock based on those values
function updateVisualTime(aid){
    
    let datanode = document.getElementById(`clock_${aid}`);
    let start = datanode.dataset.starttime;
    let end = datanode.dataset.endtime;
    //formtoupdate.querySelector('.start').placeholder = start;
    document.getElementById(`starttime_${aid}`).setAttribute('value',start);
    document.getElementById(`starttime_${aid}`).placeholder = start;
    document.getElementById(`endtime_${aid}`).setAttribute('value',end);
    document.getElementById(`endtime_${aid}`).placeholder = end;
    //formtoupdate.querySelector('.end').placeholder = end;
    
}

//grab values of start and end times based on activity id in dataset
//updates values of activity viusal clock based on those values
function updateVisualTimeData(aid){
    const start = document.getElementById(`starttime_${aid}`).value;
    const end = document.getElementById(`endtime_${aid}`).value;
    let nodetoupdate = document.getElementById(`clock_${aid}`);
    nodetoupdate.dataset.starttime = start;
    nodetoupdate.dataset.endtime = end;
    
    
}

//resets all visual clocks to state 0
function clearVisualActivities(){
    document.querySelectorAll(`.activity_row`).forEach(row=>{
        
        row.querySelectorAll('.row').forEach(twohourblock =>{
            twohourblock.querySelectorAll('.container').forEach(singlehourblock =>{
                singlehourblock.classList.remove('justify-content-start');
                singlehourblock.classList.remove('justify-content-end');
                singlehourblock.classList.add('justify-content-between');
                //resets inner divs width's back to zero
                singlehourblock.querySelector('.start').style.width=`0%`;
                singlehourblock.querySelector('.end').style.width=`0%`;
                singlehourblock.querySelector('.item').style.width=`0%`;
                //.forEach(insidediv =>{
                //    insidediv.style.width=`%0`;
                //});
            });
        });
        
    });
}

function reorderVisualActivities(){
    //known bug: if user changes more than a single activity's time, it will sort on that time but the activity's time will not change
    //...only time of submit button pushed will be changed in database.
    let allclocks = document.getElementById('visualactivitytimes');
    let forms = [];
    
    allclocks.querySelectorAll('.activity_row').forEach(formnode =>{
        let nid = formnode.id.split('_')[1];
        let start = document.getElementById(`starttime_${nid}`).value;
        let end = document.getElementById(`endtime_${nid}`).value;
        let shr = start.split(':')[0];
        let smin = start.split(':')[1];
        let ehr = end.split(':')[0];
        let emin = end.split(':')[1];
        forms.push({'id':nid,'time':start});
    });
            
    let sorted = sortClockTimes(forms);
    organizeClockTimes(sorted);

}


function organizeClockTimes(sortedtimes){
    let newClockHTML='';
    let newFormHTML='';
    let currenttimes={};
    const totaldur = document.getElementById('totalduration').innerHTML;
    const currentdur = document.getElementById('currentduration').innerHTML;
    const remaindur = document.getElementById('remainingduration').innerHTML;
    const overdur = document.getElementById('overtime').innerHTML;
    //build new visualactivitytimes innerHTML
    sortedtimes.forEach(activityobj =>{
        let clockinner = document.getElementById(`visualgroup_${activityobj['id']}`).innerHTML;
        newClockHTML+=`
        <div id="visualgroup_${activityobj['id']}">
        ${clockinner}
        </div>
        `;
        
        let currenttime = document.getElementById(`time_${activityobj['id']}`).value;
        currenttimes[`${activityobj['id']}`] = currenttime;
        let rowinner = document.getElementById(`${activityobj['id']}`).innerHTML;

        newFormHTML+=`
        <tr class="date_row" id='${activityobj['id']}'>
        ${rowinner}
        </tr>
        `;

    });
    //sets the newly ordered html divs to the loaded page
    document.getElementById(`visualactivitytimes`).innerHTML = newClockHTML;

    //TODO: dynamically setting order of elements inside of form has odd outcomes.
    //maybe table is interfering? async function disabled til it is fixed
    document.getElementById(`generatedrows`).innerHTML = `
                                                    ${newFormHTML}
                                                    `;
    console.log(currenttimes);
    

}

function getObjectIndex(obj,array){
    let result;
    array.forEach((cur,idx) =>{
        if(obj['id']==cur['id']){
            result=idx;
        }
    });
    return result;
}

function sortClockTimes(objarray){
    let sorted =[];
    let unsorted = [...objarray];
    objarray.forEach((cur,idx) =>{
        let earliest = getEarliestActivity(unsorted);
        //remove earilest form unsorted
        let earlyidx = getObjectIndex(earliest,unsorted);
        sorted.push(earliest);
        unsorted.splice(earlyidx,1);
    });

    return sorted;  
}

function getEarliestActivity(objarray){
    let earliest=undefined;
    objarray.forEach(cur =>{
        if(earliest==undefined){
            earliest=cur;
        }
        else{
            let currenttime = cur['time'];
            let earlytime = earliest['time'];
            let currenthr = currenttime.split(':')[0];
            let currentmin = currenttime.split(':')[1];
            let earlyhr = earlytime.split(':')[0];
            let earlymin = earlytime.split(':')[1];
            //found a new earliest time. update earliest
            if(Number(currenthr)<Number(earlyhr) || (Number(earlyhr)==Number(currenthr) && Number(currentmin)<Number(earlymin))){
                earliest = cur;
            }
        }
        
    });
    return earliest;
}

function populateVisualActivities(){
    document.querySelectorAll(`.activity_row`).forEach(row=>{
        
        let id = row.id.split('_')[1]
        let start = row.dataset.starttime; // 4 char string eg '1234','0000','2030'
        let end = row.dataset.endtime;
        let shr = `${start.charAt(0)}${start.charAt(1)}`;
        let smin = `${start.charAt(3)}${start.charAt(4)}`;
        let ehr = `${end.charAt(0)}${end.charAt(1)}`;
        let emin = `${end.charAt(3)}${end.charAt(4)}`;
        
        //activity starts and ends within same hr time block within html.
        if(Math.abs(Number(shr)-Number(ehr))==0){
            let startpercent = smin/60*100
            let endpercent = 100-(emin/60*100)
            let blockpercent = 100-startpercent-endpercent
            document.getElementById(`${id}_${shr}00`).style.width =`${blockpercent}%`
            row.querySelector(`.startpercent${shr}`).style.width =`${startpercent}%`
            row.querySelector(`.endpercent${shr}`).style.width =`${endpercent}%`
            document.getElementById(`${id}_${shr}00`).parentNode.classList.add('justify-content-end');
            document.getElementById(`${id}_${shr}00`).parentNode.classList.remove('justify-content-between');
        }else{
            //activity 
            
            let percent = Math.round(smin/60*100)
            let startpercent = 100-percent
                if(startpercent>0){
                    document.getElementById(`${id}_${shr}00`).style.width =`${startpercent}%`
                    document.getElementById(`${id}_${shr}00`).parentNode.classList.add('justify-content-end');
                    document.getElementById(`${id}_${shr}00`).parentNode.classList.remove('justify-content-between');
                }

            let endpercent = Math.round(emin/60*100)
            
                if(endpercent>0){
                    document.getElementById(`${id}_${ehr}00`).style.width =`${endpercent}%`
                    //needed for the case of start and end hour being the same. use justify-content-between to 50 percent it.
                    //could move this function check further up and assume its true here following the startpercent logic
                    document.getElementById(`${id}_${ehr}00`).parentNode.classList.add('justify-content-start');
                    document.getElementById(`${id}_${ehr}00`).parentNode.classList.remove('justify-content-between');
                }
    
    
            let tophour=23;
            let h="";
            for (let hour = 0; hour <= tophour; hour++) {
                if(Number(shr)<hour && hour<Number(ehr)){
                    
                    if(hour<10){
                        h=`0${hour}`
                    }else{
                        h=`${hour}`
                    }
                    
                    document.getElementById(`${id}_${h}00`).style.width = '100%';
                        
                    
                    
                    
                }
            }
        }
        
        
    });
}

//returnrs true if 2 hour time block has already been altered
function nodeUnaltered(node){
    //assume node has not been changed
    let result=true;
    node.classList.forEach(nodeclass =>{
        //node has been changed
        if(nodeclass=='justify-content-end'){
            result = false;
        }
    })
    return result
}

function newCategoryListener(){
    
    document.getElementById('category').addEventListener('keypress', event=>{
        //event.preventDefault();
        if (event){
            
            if(checkCategory(document.getElementById('category').value)){//category is valid
                //change href path to the valid category. check server sdie as well
                document.querySelector('.category-btn').href=`/add/${document.getElementById('category').value}`;
            }
            else{
                document.getElementById('category').placeholder = "alphabet letters only";
                document.getElementById('category').value='';
                //implementation needs work
            }
            
            
        }
    })

    document.querySelector('.category-btn').addEventListener('click', event=>{
        if (event){
            
            if(checkCategory(document.getElementById('category').value)){//category is valid
                //change href path to the valid category. check server sdie as well
                let currentdateid = document.querySelector('.category-btn').id;
                //1 toggles createmodal
                document.querySelector('.category-btn').href=`/add/${document.getElementById('category').value}/${currentdateid}/1`;
            }
            else{
                document.getElementById('category').placeholder = "alphabet letters only";
                document.getElementById('category').value='';
                //implementation needs work
            }
            
            
        }

    })

}

//returns 1 if string is aokay
function checkCategory(charstring){
    let success=1;
    charstring.split('').forEach(char => {
        
        if (!(char>='A' && char<='z')){
            
            success= 0;
        }
    });
    return success
}

function greyOutFinishedRows(){
    
}

function calculateTotalTime(){
    let finalhr=0,finalmin=0,finalsec=0;
    let overhr=0, overmin=0, oversec=0;
    let totalhour=0,totalminute=0,totalsecond=0;
    let currenthour=0,currentminute=0,currentsecond=0;
    //for each activity scheudled for the day, add the target time and current time separatly 
    document.querySelectorAll('.date_row').forEach(row =>{
        let total = document.getElementById(`duration_${row.id}`).value;
        let current = document.getElementById(`time_${row.id}`).value;
        const totaltime = total.split(':');
        const currenttime = current.split(':');
        let totalhr=Number(totaltime[0]),totalmin=Number(totaltime[1]),totalsec=Number(totaltime[2]);
        let currenthr=Number(currenttime[0]),currentmin=Number(currenttime[1]),currentsec=Number(currenttime[2]);
        //row's current hour is larger than max time or row has been marked as finished. add activity duration to the time as current time has exceeded the duration 
        if(currenthr>totalhr || (currenthr>=totalhr && currentmin>=totalmin && currentsec>=totalsec) || Number(document.getElementById(`finish_${row.id}`).value)==1){
            currenthour+=totalhr;
            currentminute+=totalmin;
            currentsecond+=totalsec;
            //only applies to activities where current time is equal or greater than the activity's full duration
            if(currenthr>=totalhr && currentmin>=totalmin && currentsec>=totalsec){
                if(currenthr>totalhr){
                    overhr+=currenthr-totalhr;
                }
                if(currentmin>totalmin){
                    overmin+=currentmin-totalmin;
                }
                if(currentsec>totalsec){
                    oversec+=currentsec-totalsec;
                }
            }
        }
        else{
            currenthour+=currenthr;
            currentminute+=currentmin;
            currentsecond+=currentsec;
        }
        totalhour+=totalhr;
        totalminute+=totalmin;
        totalsecond+=totalsec;
    })
    const overtime = convertToReadableTime(overhr,overmin,oversec);
    const totalduration = convertToReadableTime(totalhour,totalminute,totalsecond);
    const currentduration = convertToReadableTime(currenthour,currentminute,currentsecond);
    const remainingduration = getRemainingTime(totalduration,currentduration)
    
    document.getElementById('totalduration').innerHTML=totalduration;
    document.getElementById('remainingduration').innerHTML=remainingduration;
    document.getElementById('currentduration').innerHTML=currentduration;
    if(overhr!=0 || overmin!=0 || oversec!=0){
        document.getElementById('overtime').textContent = `(+${overtime})`
    }
    
    
}

function getRemainingTime(totalduration, currentduration){

    let hours = Number(totalduration.split(':')[0])*60*60-Number(currentduration.split(':')[0])*60*60;
    let minutes = Number(totalduration.split(':')[1])*60-Number(currentduration.split(':')[1])*60;
    let seconds = Number(totalduration.split(':')[2])-Number(currentduration.split(':')[2]);
    let totalsecondsremaining = hours+minutes+seconds;

    let totalminute = Math.floor(totalsecondsremaining/60);
    let hour = Math.floor(totalminute/60)
    let minute = totalminute - 60*hour;
    let second = totalsecondsremaining - totalminute*60;
    
    if(hour<10){
        hour=`0${hour}`;
    }
    if(minute<10){
        minute=`0${minute}`;
    }
    if(second<10){
        second=`0${second}`;
    }

    return `${hour}:${minute}:${second}`
}

function convertToReadableTime(hrs,mins,secs){
    if(secs>59){
        //above 60 seconds.
        let remainingseconds = secs % 60;
        let minutesadded = secs / 60;
        
        mins+=Math.floor(minutesadded);
        secs=remainingseconds;
        
    }
    if(mins>59){
        let remainingminutes = mins % 60;
        let hrsadded = mins / 60;
        hrs+=Math.floor(hrsadded);
        mins=remainingminutes;
    }
    let timestring="";
    if(hrs<10){
        hrs = `0${hrs}`
    }
    if(mins<10){
        mins = `0${mins}`
    }
    if(secs<10){
        secs = `0${secs}`
    }
    return `${hrs}:${mins}:${secs}`
}

function editVisualTime(){
    //make ajax for visual time form submit
    document.getElementById('visualactivitytimes').addEventListener('click', event =>{
        event.preventDefault();
        if(event.target.id && validateNodeWithID(event.target.id,'btn')){
            let aid = event.target.id.split('_')[1];
            let did = document.querySelector('.date').id;
            visualSubmitAJAX(did,aid);
        }
        

    });
}

function markFinishedActivities(){
    document.querySelectorAll('.date_row').forEach(row =>{
        const currenttime = document.getElementById(`time_${row.id}`).value.split(':');
        const targettime = document.getElementById(`duration_${row.id}`).value.split(':');
        const currenthr = Number(currenttime[0]);
        const currentmin = Number(currenttime[1]);
        const targethr = Number(targettime[0]);
        const targetmin = Number(targettime[1]);
        if(currenthr >= targethr && currentmin >= targetmin){
            row.querySelector('.stopwatch').classList.remove('text-success')
            row.querySelector('.stopwatch').classList.add('text-danger')
        //    row.classList.add('table-primary')
        }
        if(row.querySelector('.finish').value=='1'){
            row.querySelector('.finishbutton').classList.add('active');
            row.classList.add('table-primary');
        }
        if(row.querySelector('.finish').value=='0'){
            row.querySelector('.finishbutton').classList.remove('active')
            row.classList.remove('table-primary');
        }
    })
}

function removeCategoryListener(){
    //       /remove/category/#fun
    document.querySelector('.removecat').addEventListener('click', event=>{
        let nodeid = document.querySelector('.removecat').id
        //nodeid is removecat-'dateid'
        let dateid = nodeid.split('-')[1]
        let selectedcategory = document.getElementById('categoryselection').value
        
        //alters its own href to appropriate values based on whats selected
        document.getElementById(nodeid).href=`/remove/category/${dateid}/${selectedcategory}`
    });
}

function toggleModal(){
    const modalbtnid = document.querySelector('.modalbtn').id;
    const toggle = modalbtnid.split('-')[1]
    if(toggle=='1'){
        document.getElementById(`createmodal-${toggle}`).click()
    }
}

function changeDays(){
    document.querySelector('.pageheader').addEventListener('click',event=>{
        
        if(event.target.id){
            let choice = event.target.id.split('_')[0];
            let dateid = event.target.id.split('_')[1];
            console.log(choice,dateid);
            document.getElementById('changedays').action=`/changeday/${dateid}/${choice}`
            //console.log(document.getElementById(event.target.id).href)
            document.getElementById('changedays').submit();
        }
        
    });
}

//given the id of a node, does a class name exist within a nodes classlist?
function validateNodeWithID(id,classname){
    let valid=false;
    
    if(document.getElementById(id).classList.length>0){
        document.getElementById(id).classList.forEach(currentclass =>{
            if(classname == currentclass){
                valid=true
            }
        })
    }
    
    return valid    
}

//lookup element id. within element, class edit-activity innerhtml holds activity name
function findActivity(id){
    let name = document.getElementById(`go_${id}`).innerHTML;
    return name
}
//applys the string to the alert message in DOM
//appends element to the bottem of page
function alertMessage(string){
    let alertdiv = document.createElement('div')
    alertdiv.classList.add('alert')
    alertdiv.classList.add('alert-success')
    alertdiv.classList.add('alert-dismissable')
    alertdiv.innerHTML = `
    <button class="close" type="button" data-dismiss="alert">
        <span>&times;</span>
    </button>
    <div id="alertmessage">${string}</div>`;
    document.body.appendChild(alertdiv);
}

function visualSubmitAJAX(dateid,activityid){

    let xhttp;
    let formelement = document.getElementById(`timevisual_${activityid}`);

    xhttp = new XMLHttpRequest();
    
    //xhttp.responseURL = `/control/${dateid}`
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            console.log('submit has been processed. need to update DOM');
            

            //broken due to ordering of form elements not owrking
            //visual timeline needs to change to reflect async changes
            updateVisualTimeData(activityid);
            updateVisualTime(activityid);
            clearVisualActivities();
            reorderVisualActivities();
            populateVisualActivities();
            stopwatchControl();
            

		}
    };

    xhttp.open(formelement.method, `/time/${dateid}`, true);
    
	xhttp.send(new FormData(formelement));

}

function clearAJAX(dateid){
    let xhttp;
    let formelement = document.getElementById('stopwatches');
    xhttp = new XMLHttpRequest();
    
    //xhttp.responseURL = `/control/${dateid}`
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            //update total/current/remaining activity time
            calculateTotalTime();
		}
    };
    
    xhttp.open(formelement.method, `/control/${dateid}`, true);
	xhttp.send(new FormData(formelement));
}

function pauseAJAX(dateid){
    //submit stopwatch form
    let xhttp;
    let formelement = document.getElementById('stopwatches');

    xhttp = new XMLHttpRequest();
    
    //xhttp.responseURL = `/control/${dateid}`
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            //update total/current/remaining activity time
            calculateTotalTime();
		}
    };
    
    xhttp.open(formelement.method, `/control/${dateid}`, true);
	xhttp.send(new FormData(formelement));

}

function finishAJAX(dateid){
    let xhttp;
    let formelement = document.getElementById('stopwatches');

    xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            //nothing needs to happen after server comppletes
            
		}
    };

    xhttp.open(formelement.method, `/control/${dateid}`, true);
	xhttp.send(new FormData(formelement));
}

function activateFinishButton(){
    document.getElementById('tablebody').addEventListener('click', event=>{
        //event.preventDefault();
        let targetnode = event.target;
        
        //target node is a finish button
        if(targetnode.classList.length>0 && validateNodeWithID(targetnode.id,'finishbutton')){
            event.preventDefault();
            let id = targetnode.id.split('_')[1];
            let link = document.getElementById(`go_${id}`).href.split('edit')[1].split('/');
            
            let datid = link[link.length-1];
            
            let finishnode = document.getElementById(`finish_${id}`);
            //finish button is inactive,change to active, update remaining time with activity's full duration regardless of current time
            if(finishnode.value=='0'){
                finishnode.value='1';
                targetnode.classList.add('active');
                document.getElementById(id).classList.add('table-primary')
                finishAJAX(datid);
                
            }
            //finish button is active,change to inactive, update remaining time with activity's current time
            else if(finishnode.value=='1'){
                finishnode.value='0';
                targetnode.classList.remove('active');
                document.getElementById(id).classList.remove('table-primary')
                finishAJAX(datid);
            }
            
            calculateTotalTime();
        }
        
    })
}

function snoozeListener(){
    //if snooze button is clicked on
    document.getElementById('snoozebtn').addEventListener('click', event =>{
        console.log('pinishd')
        snooze();
    })
    
}
//let JSONdata=undefined;
//fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err,data) => {
//    JSONdata = data;
//});
//let swlist = new StopwatchList();
//dateTableListeners()
//editVisualTime(); //need to fix conflict with table and form rearranging of elements
changeDays();
activateFinishButton();
stopwatchControl();
toggleModal();
snoozeListener();
newCategoryListener();
removeCategoryListener();
markFinishedActivities();
calculateTotalTime();