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
        console.log(`time is ${out} compared to ${this.duration}`)
        const targethr = Number(this.duration.split(':')[0])
        const targetmin = Number(this.duration.split(':')[1])
        console.log('enditme---------->',this.duration)
        console.log(targethr,this.hour,targethr>=this.hour)
        console.log(targetmin,this.minute,targetmin>=this.minute)
        if (this.hour==targethr && this.minute==targetmin && this.second==0){
            //alert(`Activity ${this.id}, Times up!`);
            let activityname = findActivity(this.id)
            alertMessage(`Activty ${activityname} is complete!`)
            document.getElementById(`${this.id}`).classList.add('table-primary')
            document.getElementById('sound').play();
            document.getElementById(`time_${this.id}`).classList.remove('text-success');
            document.getElementById(`time_${this.id}`).classList.add('text-danger');
        }
        //document.getElementById('sound').play();
        return out;
        //console.log(id,`${this.hour}:${this.minute}:${this.second}`);
        
    }
    //inserts end time
    start(){//start(id) maybe add default value when initializing
        if(!this.interval || !this.active){
            console.log('sw id is',this.id);
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
        
        //console.log(document.getElementById(this.id).innerHTML);
        

    }

    pause(){
        if(this.interval){
            this.active=0;
            document.getElementById(`start_${this.id}`).style = "display: flexbox";//show start
            document.getElementById(`pause_${this.id}`).style = "display: none";//hide pause
            document.getElementById(`time_${this.id}`).classList.remove('active');
            //get all classes of stopwatch. classlist will contain active if sotpwatch is counting

            clearInterval(this.interval);
        }
    }
    stop(){
        if(this.interval){
            this.active=0;
            
            clearInterval(this.interval);
            this.reset();
        }
    }
    reset(){
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.active=0;
        this.time='00:00:00';
        document.getElementById(`time_${this.id}`).value = `00:00:00`;
        document.getElementById(`time_${this.id}`).classList.remove('active');
        document.getElementById(`time_${this.id}`).classList.add('text-success');
        document.getElementById(`time_${this.id}`).classList.remove('text-danger');
        document.getElementById(`pause_${this.id}`).style = "display: none";//hide pause
        document.getElementById(`start_${this.id}`).style = "display: flexbox";//show start
        this.interval=null;
    }
    

    updateDOM(){
        console.log(document.getElementById(`time_${this.id}`).innerHTML);
        document.getElementById(`time_${this.id}`).innerHTML = `${this.hour}:${this.minute}:${this.second}`;
    }
    
}//class Stopwatch


function dateTableListeners(){
    if (location.pathname=='/index.html'){
        console.log('hi')
        document.querySelectorAll('a').forEach(link =>{
            console.log(link);
            console.log(link.textContent);
        });//addEventListener('click', event=>{
            //console.log(event.target);
        //});
    }
}

function stopwatchControl(){
    console.log(location.pathname);
    
        console.log(location.pathname);
        //let swlist = new StopwatchList();
        //stopwatch = new Stopwatch(`time_1`);
        //swlist.add(stopwatch);
        //stopwatch = new Stopwatch(`time_2`);
        //console.log(location);
        //console.log(JSONdata);
        //initialize stopwatch for every activity
        
        populateVisualActivities();
            
        
        //populate activity list
        //dateView.populateActivities(data.activities);
        //dateView.populateActivities(window.localStorage.getItem('activelist'));
        //***check only new activities show***//
        //dateView.populateDropDownListOfActivities(data.activities);//possibly use local storage to pull from
        //dateView.populateDropDownListOfActivities(window.localStorage.getItem('nonactivelist');

        let stopwatches = {}
        //create stopwatches for every activity
		document.querySelectorAll('.date_row').forEach(row =>{
            const time = document.getElementById(`time_${row.id}`).value
            const duration=document.getElementById(`duration_${row.id}`).value;
            console.log('duration',duration);
            console.log(row);
			stopwatches[`stopwatch_${row.id}`]= new Stopwatch(row.id,time,duration)
        });
        
        //activate any stopwatch that is supposed to be active
        document.querySelectorAll('.activate').forEach(stopwatch =>{
            if(Number(stopwatch.value)==1){//0 is not active 1 is active
                let id = stopwatch.id.split('_')[1]//time_12 = "12"
                stopwatches[`stopwatch_${id}`].start()
            }
        });
        console.log(stopwatches);
        
        document.querySelector('.date_table').addEventListener('click', event=>{
            //console.log(event.target);
            //console.log(stopwatches)
            //every activity has an active property to establish which activity is currently running on page load
            //1 - active
            //0 - not active
            if(event.target.id && event.target.id.split('_')[0]=='start'){
                console.log(event.target.id)
                console.log(stopwatches)
                stopwatches[`stopwatch_${event.target.id.split('_')[1]}`].start();//uses id from event target to link with appropriate stopwatch
                document.getElementById(`active_${event.target.id.split('_')[1]}`).value="1";
                //stopwatch.start()
                
                //stopwatch.interval = setInterval(() =>stopwatch.increment(stopwatch.id), 1000);
                //let x = setInterval(sw.increment,1000);
            }
            if(event.target.id && event.target.id.split('_')[0]=='stop'){
                let stopwatch= stopwatches[`stopwatch_${event.target.id.split('_')[1]}`];
                console.log(stopwatch);
                console.log('stopping')
                stopwatch.stop();//clearInterval(stopwatch.interval);
                
            }
            if(event.target.id && event.target.id.split('_')[0]=='pause'){
                let stopwatch= stopwatches[`stopwatch_${event.target.id.split('_')[1]}`];
                document.querySelectorAll('.activate').forEach(hiddeninput =>{
                    if(hiddeninput.id.split('_')[1]==event.target.id.split('_')[1]){//swtiches activation value 
                        document.getElementById(`active_${event.target.id.split('_')[1]}`).value="0"
                        console.log(event.target,document.getElementById(`active_${event.target.id.split('_')[1]}`).value)
                    }
                });
                console.log(stopwatch);
                stopwatch.pause();//clearInterval(stopwatch.interval);
                
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
function populateVisualActivities(){
    document.querySelectorAll(`.activity_row`).forEach(row=>{
        
        let id = row.id.split('_')[1]
        let start = row.id.split('_')[2] // 4 char string eg '1234','0000','2030'
        let end = row.id.split('_')[3]
        let shr = `${start.charAt(0)}${start.charAt(1)}`;
        let smin = `${start.charAt(3)}${start.charAt(4)}`;
        let ehr = `${end.charAt(0)}${end.charAt(1)}`;
        let emin = `${end.charAt(3)}${end.charAt(4)}`;
        console.log(id,start,end)
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
                    console.log(hour);
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
            //console.log(event.target);
            if(checkCategory(document.getElementById('category').value)){//category is valid
                //change href path to the valid category. check server sdie as well
                document.querySelector('.category-btn').href=`/add/${document.getElementById('category').value}`;
            }
            else{
                document.getElementById('category').placeholder = "alphabet letters only";
                document.getElementById('category').value='';
                //implementation needs work
            }
            //if (document.getElementById('category').value>='A' && document.getElementById('category').value<='z'){
            //    console.log(document.getElementById('category').value)
            //}
            
        }
    })

    document.querySelector('.category-btn').addEventListener('click', event=>{
        if (event){
            //console.log(event.target);
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
            //if (document.getElementById('category').value>='A' && document.getElementById('category').value<='z'){
            //    console.log(document.getElementById('category').value)
            //}
            
        }

    })

    
    document.getElementById('categoryselection').addEventListener('click', event=>{
        console.log(event.target)
    })
    //document.querySelector('.category_option').addEventListener('click',event=>{
    //    console.log(event.target)
    //})

}

//returns 1 if string is aokay
function checkCategory(charstring){
    let success=1;
    charstring.split('').forEach(char => {
        
        if (!(char>='A' && char<='z')){
            console.log(char);
            success= 0;
        }
    });
    return success
}

function greyOutFinishedRows(){
    
}

function calculateTotalTime(){
    let finalhr=0,finalmin=0,finalsec=0;
    
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
        if(currenthr>totalhr || (currenthr>=totalhr && currentmin>=totalmin && currentsec>=totalsec)){
            currenthour+=totalhr;
            currentminute+=totalmin;
            currentsecond+=totalsec;
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
    const totalduration = convertToReadableTime(totalhour,totalminute,totalsecond);
    const currentduration = convertToReadableTime(currenthour,currentminute,currentsecond);
   
    
    document.getElementById('totalduration').innerHTML=totalduration;
    document.getElementById('remainingduration').innerHTML=currentduration;
    
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

function greyOutCompletedActivities(){
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
            row.classList.add('table-primary')
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

function activityAlert(){

}

//lookup element id. within element, class edit-activity innerhtml holds activity name
function findActivity(id){
    let name = document.getElementById(`go_${id}`).innerHTML;
    return name
}
//applys the string to the alert message in DOM
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
//console.log(data);
//let JSONdata=undefined;
//fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err,data) => {
//    JSONdata = data;
//});
//let swlist = new StopwatchList();
//dateTableListeners()
stopwatchControl();
toggleModal();
newCategoryListener();
removeCategoryListener();
greyOutCompletedActivities();
calculateTotalTime();