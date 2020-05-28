//import * as dateView from './dateView'

class Activity {
    constructor(name,target,current,description){
        this.name = name;
        this.target =target;
        this.current = current;
        this.description = description;
    }
}

class Day {//consists of a list of activties
    constructor(date,actlist){
        this.id = date;
        this.activitylist= actlist;
    }
}

class Stopwatch{
    constructor(id,time){
        this.id = id;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.time = time
        this.interval=undefined;
        this.endtime = undefined;
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
        if (this.endtime==out){
            //alert(`Activity ${this.id}, Times up!`);
            document.getElementById('sound').play();
            document.getElementById(`time_${this.id}`).classList.toggle('text-success');
            document.getElementById(`time_${this.id}`).classList.toggle('text-danger');
        }

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
            
            this.endtime=document.getElementById(`endtime_${this.id}`).innerHTML;
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
    
}

class StopwatchList{
    constructor(){
        this.list=[]
    }
    add(stopwatch){
        this.list.push(stopwatch)
    }
    get(id){
        this.list.forEach((stopwatch,idx)=>{
            if (stopwatch.id==id){
                console.log(stopwatch)
                return stopwatch;
            }
        });
        
    }
}
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

function individualDateListeners(){
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
            //console.log(time);
            //console.log(row);
			stopwatches[`stopwatch_${row.id}`]= new Stopwatch(row.id,time)
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
        let smin = `${start.charAt(2)}${start.charAt(3)}`;
        let ehr = `${end.charAt(0)}${end.charAt(1)}`;
        let emin = `${end.charAt(2)}${end.charAt(3)}`;
        console.log(id,start,end)
        if(Number(smin)<15){
            idminute = "00"
            document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).style.width ='100%'
            //document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).innerHTML = `${shr}${smin}`;
            document.getElementById(`${id}_${shr}30`).querySelector(`.row_color`).style.width ='100%'
            //document.getElementById(`${id}_${shr}30`).querySelector(`.row_color`).innerHTML = `_`;
        }else if(Number(smin)<30){//start on the 15 min mark; make container 50% width maybe inline right class
            idminute = "00"
            document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).style.width = '50%';
            document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).classList.add('float-right');
            //document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).innerHTML =`${shr}${smin}`;
            document.getElementById(`${id}_${shr}30`).querySelector(`.row_color`).style.width = '100%';
            //document.getElementById(`${id}_${shr}30`).querySelector(`.row_color`).innerHTML =`_`;
        }else if (Number(smin)<45){
            idminute = "30"
            document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).style.width = '100%'
            //document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).innerHTML =`${shr}${smin}`
        }
        else{//start on 45 min mark
            
            
            idminute = "30"
            document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).style.width = '50%'
            //document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).innerHTML =`${shr}${smin}`
            document.getElementById(`${id}_${shr}${idminute}`).querySelector(`.row_color`).classList.add('float-right');
        }

        if(Number(emin)<=15){//finish at 5:07 == 5:15 finish time
            idminute = "00"
            document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).style.width = '50%'
            document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).classList.add('float-left');
            //document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).innerHTML =`${ehr}${emin}`
            
        }else if(Number(emin)<=30){//5:25 ==5:30 finish time
            idminute = "00"
            document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).style.width = '100%'
            //document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).innerHTML =`${ehr}${emin}`
        }else if (Number(emin)<=45){//5:40 == 5:45 finish time
            idminute = "30"
            document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).style.width = '50%'
            document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).classList.add('float-left')
            //document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).innerHTML =`${ehr}${emin}`
            document.getElementById(`${id}_${ehr}00`).querySelector(`.row_color`).style.width = '100%'
            //document.getElementById(`${id}_${ehr}00`).querySelector(`.row_color`).innerHTML =`_`
        }
        else{//fill in entire 1 hr mark
            idminute = "30"
            document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).style.width = '100%'
            //document.getElementById(`${id}_${ehr}${idminute}`).querySelector(`.row_color`).innerHTML =`${ehr}${emin}`
            document.getElementById(`${id}_${ehr}00`).querySelector(`.row_color`).style.width = '100%'
            //document.getElementById(`${id}_${ehr}00`).querySelector(`.row_color`).innerHTML =`_`
        }

        let tophour=23;
        let bothminutes = ["00","30"]
        let h="";
        for (let hour = 0; hour <= tophour; hour++) {
            if(Number(shr)<hour && hour<Number(ehr)){
                console.log(hour);
                if(hour<10){
                    h=`0${hour}`
                }else{
                    h=`${hour}`
                }
                bothminutes.forEach(minute =>{
                    document.getElementById(`${id}_${h}${minute}`).querySelector(`.row_color`).style.width = '100%';
                    //document.getElementById(`${id}_${h}${minute}`).querySelector(`.row_color`).innerHTML =`_`
                });
                
            }
        }
        
    });
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
                document.querySelector('.category-btn').href=`/add/${document.getElementById('category').value}/${currentdateid}`;
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


//console.log(data);
//let JSONdata=undefined;
//fs.readFile(`${__dirname}/data/data.json`, 'utf-8', (err,data) => {
//    JSONdata = data;
//});
//let swlist = new StopwatchList();
//dateTableListeners()
individualDateListeners()
newCategoryListener();