let calendarList=[];

function buildCalendarList(){
    let objcount = 0;
    document.querySelectorAll('.month').forEach(monthnode =>{
        console.log(monthnode)
        let monthobj = {
            'id':monthnode.id
        }
        calendarList.push(monthobj)
        objcount+=1;

    });
    //document.querySelectorAll('.year').forEach(yearnode =>{
    //    let currentyear = yearnode.id;
    //    console.log(currentyear)
    //    yearnode.querySelectorAll('.month').forEach(monthnode =>{
    //        console.log(monthnode.id)
    //        calendarList.push(monthnode.id)
    //    }); 
    //})
}

function deactivateYear(year){
    document.getElementById(year).style.display = 'none';
}

function activateYear(year){
    document.getElementById(year).style.display = 'block';
}

//month is string, year is number
function deactivateMonth(month,year){
    
        
    document.getElementById(`${month}-${year}`).classList.remove('active');
    document.getElementById(`${month}-${year}`).style.display = 'none';
    
}

//month is string, year is number
function makeMonthActive(month,year){
    
    document.getElementById(`${month}-${year}`).classList.add('active');
    document.getElementById(`${month}-${year}`).style.display = 'block';
    
}

function overlayActiveCategories(){
    let listofactivecategories = []
    document.querySelectorAll(".dropdown-item").forEach(category =>{
        //if active category, push to list
        console.log(category)
        category.classList.forEach(containerclass => {
            if (containerclass == 'active'){
                listofactivecategories.push(category.id)
            }
        })
    }); 
    //console.log('====ACTIVES=====')
    //console.log(listofactivecategories)
    document.querySelectorAll(`.activity`).forEach(container =>{
        let activitycat = container.innerHTML;
        console.log('current cat',activitycat)
        console.log(event.target.classList)
        if (listofactivecategories.includes(activitycat.trim())){
            container.style.display = 'block';
            //console.log(container);
        }else{
            container.style.display = 'none';
            console.log(container);
        }
    })
}

function doesClassListContainActive(classlist){
    let truth = 0;
    classlist.forEach(each => {
        console.log(each)
        if(each.includes('active')){
            truth=1
        }
        
    });
    return truth
}
function calendarNavigation(calendarList){
    
    addMonthToCalendarButtons();
    //active next and previous buttons
    document.querySelector(`.fluid-container`).addEventListener('click', event=>{
        //console.log(event.target)
        if(event.target.classList[0] == "dropdown-item"){
            let category = event.target.innerHTML;
            console.log(event.target.id)
            let isactive = doesClassListContainActive(document.getElementById(event.target.id).classList)
            console.log(isactive)
            if(isactive){
                document.getElementById(event.target.id).classList.remove('active');
            }else{
                document.getElementById(event.target.id).classList.add('active');
            }
            isactive = doesClassListContainActive(document.getElementById(event.target.id).classList)
            console.log(isactive)
            overlayActiveCategories();
            

        }

        if(event.target.id=='prev'){
            let activemonthid = document.getElementById('years').querySelector(`.active`).id.split('-')[0];
            let activeyearid = Number(document.getElementById('years').querySelector(`.active`).id.split('-')[1]);

            calendarList.forEach((obj,idx)=>{
                
                let month = obj['id'].split('-')[0]
                let year = Number(obj['id'].split('-')[1])
                let firstmonth = calendarList[0]['id'].split('-')[0];
                let firstyear = Number(calendarList[0]['id'].split('-')[1]);

                //if not at beginning
                if(month==activemonthid && year==activeyearid && (activemonthid!=firstmonth || activeyearid!=firstyear)){
                    let prevmonth = calendarList[idx-1]['id'].split('-')[0]
                    let prevyear = calendarList[idx-1]['id'].split('-')[1]
                    
                    //console.log('deactivating ...',month,year)
                    //console.log(`activating ...`, prevmonth,prevyear)
                    //console.log(event.target.parentNode)
                    
                    //deactivate the year in yearid and activate next year in sequence
                    
                    deactivateMonth(activemonthid,activeyearid)
                    //go to next year and month
                    makeMonthActive(prevmonth,prevyear)
                }
            });
            
        }
        if(event.target.id=='next'){
            let activemonthid = document.getElementById('years').querySelector(`.active`).id.split('-')[0];
            let activeyearid = Number(document.getElementById('years').querySelector(`.active`).id.split('-')[1]);
            //console.log('active is',activemonthid,activeyearid)
            calendarList.forEach((obj,idx)=>{ //id==may-2020 
                let month = obj['id'].split('-')[0]
                let year = Number(obj['id'].split('-')[1])
                let lastmonth = calendarList[calendarList.length-1]['id'].split('-')[0];
                let lastyear = Number(calendarList[calendarList.length-1]['id'].split('-')[1]);
                //if not at the end

                if(month==activemonthid && year==activeyearid && (lastmonth!=activemonthid || lastyear!=activeyearid)){
                    let nextmonth = calendarList[idx+1]['id'].split('-')[0]
                    let nextyear = calendarList[idx+1]['id'].split('-')[1]
                    
                    //console.log('deactivating ...',month,year)
                    //console.log(`activating ...`, nextmonth,nextyear)
                    //console.log(event.target.parentNode)
                    
                    //deactivate the year in yearid and activate next year in sequence
                    
                    deactivateMonth(activemonthid,activeyearid)
                    //go to next year and month
                    makeMonthActive(nextmonth,nextyear)
                    
                    
                    
                }
            });
           
        }

        //addMonthToCalendarButtons()
    });
    

}

function addMonthToCalendarButtons(){
    year = {
        'january': {
            'next': 'february',
            'prev': 'december',
        },
        'february': {
            'next': 'march',
            'prev': 'january',
        },
        'march': {
            'next': 'april',
            'prev': 'february',
        },
        'april': {
            'next': 'may',
            'prev': 'march',
        },
        'may': {
            'next': 'june',
            'prev': 'april',
        },
        'june': {
            'next': 'july',
            'prev': 'may',
        },
        'july': {
            'next': 'august',
            'prev': 'june',
        },
        'august': {
            'next': 'september',
            'prev': 'july',
        },
        'september': {
            'next': 'october',
            'prev': 'august',
        },
        'october': {
            'next': 'november',
            'prev': 'september',
        },
        'november': {
            'next': 'december',
            'prev': 'october',
        },
        'december': {
            'next': 'january',
            'prev': 'november',
        }
    }
    
    document.querySelectorAll('.month').forEach(month=>{
        let id = month.id.split('-')[0]
        document.querySelector(`.previous-${id}`).querySelector('.btn').innerHTML = year[id]['prev'].toUpperCase();
        document.querySelector(`.next-${id}`).querySelector('.btn').innerHTML = year[id]['next'].toUpperCase();
    });
    
    
    
}

function enableFiltering(){
    console.log('filtering loaded')
    document.querySelector('.dropdown-item').addEventListener('click', event=>{
        //console.log(event.target.href)
    })
}

function checkActive(){
    let active = document.getElementById('years').querySelector('.active')
    console.log(active)
    if (active){
        return true
    }
    return false
}

function getActive(){
    let month = document.getElementById('years').querySelector('.active').id.split('-')[0]
    let year = document.getElementById('years').querySelector('.active').id.split('-')[1]
    return {
        month,
        year
    }

}

function hideCategories(catlist){
    catlist.forEach(category =>{
        document.querySelectorAll(`.${category}`).forEach(container =>{
            container.style.display = 'none';
        })
    })
}

function showCategories(catlist){
    catlist.forEach(category =>{
        document.querySelectorAll(`.${category}`).forEach(container =>{
            container.style.display = 'block';
        })
    })
}

//function mouseOver(){
//    console.log('mouseover')
//    document.addEventListener('mouseover', event=>{
//        let node = event.target;
//        node.classList.forEach(classname =>{
//            if(classname.includes("activity"){
//
//            }
//        });
//        if()
//    })
//}


function getCurrentDateObject(){
    const dateobj = new Date()
    let day = dateobj.getDate();
    months=['january','february','march','april','may','june','july','august','september','october','november','december'];
    let month = months[dateobj.getMonth()];
    return {
        month:month,
        day:day,
        year:dateobj.getFullYear()
    }
}

//produces a border around current day in calendar
function hightlightCurrentDay(){
    let d = getCurrentDateObject()
    //in case the current day has not been created in the calender
    if(document.getElementById(`${d.month}${d.day}${d.year}`)){
        document.getElementById(`${d.month}${d.day}${d.year}`).parentNode.classList.add('border-danger','border','shadow-sm');
    }
    
    
}

function dayListener(){
    
        ///    
            //if clicked node has a link within it, execute the link
    ///     if(node.getElementsByTagName('A').length != 0){
    ///         const daylink = node.getElementsByTagName('A')[0]; //only one link exists for any single day. manually select the first one
    ///            daylink.click()
    ///     }
    ///     
    ///     const week = ['mon','tue','wed','thu','fri','sat','sun'];
    ///     let day="";
    ///     node.classList.forEach(clas =>{
    ///         if(clas=="activity"){
    ///             let editactivity = document.createElement('a');
    ///             editactivity.href = `/edit/${node.id}`
    ///             editactivity.click()
    ///         }
    ///     })
    ///     console.log(day)
    document.getElementById('years').addEventListener('click', event=>{
        event.preventDefault();
        let node = event.target
        console.log(node);
        
        
        //clicked object is the link itself. display card associated with that day
        if(validateNodeWithID(node.id,'linkbtn')){
            console.log('linkbutton was lcicked')
            m  = {'january':01,'february':02,'march':03,'april':04,'may':05,'june':06,'july':07,'august':08,'september':09,'october':10,'november':11,'december':12,}
            let month=m[node.dataset.month];
            let day = node.dataset.day;
            let year = node.dataset.year;//all strings
            console.log(year,month,day)
            if(month<10){
                month=`0${month}`
            }

            if(day<10){
                day=`0${day}`
            }
            
            //card is already being shown, hide it and remvo active class
            if(validateNodeWithID(`${year}-${month}-${day}`,'active')){
                console.log(node.dataset.month,day)
                document.getElementById(`${node.dataset.month}${Number(day)}${year}`).classList.remove('active','btn-outline-info');
                document.getElementById(`${year}-${month}-${day}`).style.display = "none";
                document.getElementById(`${year}-${month}-${day}`).classList.remove('active');    
            }
            else{
                document.getElementById(`${node.dataset.month}${Number(day)}${year}`).classList.add('active','btn-outline-info');
                document.getElementById(`${year}-${month}-${day}`).style.display = "block";
                document.getElementById(`${year}-${month}-${day}`).classList.add('active')
            }    
        }

        //clicked object is the day box. execute day link
        else if(node.id=='day' && (validateNodeWithID(node.id,'sun') || validateNodeWithID(node.id,'mon') || validateNodeWithID(node.id,'tue') || validateNodeWithID(node.id,'wed') || validateNodeWithID(node.id,'thu') || validateNodeWithID(node.id,'fri') || validateNodeWithID(node.id,'sat'))){
            
            //execute the link
            let daylink = document.createElement('a');
            daylink.href= node.getElementsByTagName('A')[0].href;
            daylink.click()  
        }

        //object clicked is of acitivities listed within day box
        else{
            node.classList.forEach(classname =>{
                if(classname=="activity"){
                    //need date id to link the user click to a particular day
                    let datenode = node.parentNode
                    let editactivity = document.createElement('a');
                    editactivity.href = `/edit/${node.id}/${datenode.id}`
                    editactivity.click()
                }
            })
        }
    });
    
        
}

function populateCardDuration(){
    document.querySelectorAll('.card').forEach(card =>{
        produceTotalDuration(card.id);
        populateCardWeekday(card.id)
    });
}

function produceTotalDuration(cardid){
    let hour=0
    let minute=0
    let second=0

    


    let nodetoinserton = document.getElementById(cardid).querySelector('.summary');
    //calculate total duration of all activities in the day
    nodetoinserton.querySelectorAll('.activityduration').forEach(durationbadge =>{
        let hr = Number(durationbadge.textContent.split(':')[0])
        let min = Number(durationbadge.textContent.split(':')[1])
        let sec = Number(durationbadge.textContent.split(':')[2])

        hour+=hr
        minute+=min
        second+=sec
    });

    //nodetoinserton.querySelector
    let time = convertToReadableTime(hour,minute,second);
    let html = `
    <p class="card-text durationbadge">
    <span class="badge">Total Duration</span> : <span class="badge">${time}</span>
    </p>
    `
    nodetoinserton.insertAdjacentHTML('beforeend',html);
}

//replace fri with friday, sat with saturday, so on
function populateCardWeekday(cardid){
    let card = document.getElementById(cardid);
    let datenode = card.querySelector('.navbar-brand');

    let fulldate = datenode.textContent;

    let day = returnDayFromClass(cardid);
    datenode.textContent=`${day} | ${fulldate}`
}

function returnDayFromClass(id){
    let day=''
    let dotw=['mon','tue','wed','thu','fri','sat','sun']
    let days={'mon':'Monday','tue':'Tuesday','wed':'Wednesday','thu':'Thursday','fri':'Friday','sat':'Saturday','sun':'Sunday'};
    document.getElementById(id).classList.forEach(name =>{
        if(dotw.includes(name)){
            day=days[name];
        }
    })
    return day
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

//given the id of a node, does a class name exist within a nodes classlist?
function validateNodeWithID(id,classname){
    let valid=false;
    console.log(document.getElementById(id).classList.length)
    if(document.getElementById(id).classList.length>0){
        document.getElementById(id).classList.forEach(currentclass =>{
            if(classname == currentclass){
                valid=true
            }
        })
    }
    
    return valid    
}





//start
buildCalendarList();
console.log(calendarList)
let month = calendarList[0]['id'].split('-')[0];
let year = calendarList[0]['id'].split('-')[1];
if (!checkActive()){//if there is no active month then server did not render active
    const today = getCurrentDateObject();
    makeMonthActive(today.month,today.year); //makes first month active
}
else{
    let active = getActive()
    makeMonthActive(active.month,active.year);
}

function limitActivityNamesInCalendarBadges(){
    document.querySelectorAll(`.list-group-item`).forEach(itemnode =>{
        if(itemnode.innerHTML.length>10){
            itemnode.innerHTML = itemnode.innerHTML.slice(0,10);
        }
    });
}

calendarNavigation(calendarList);
enableFiltering();
hightlightCurrentDay();
populateCardDuration();
dayListener();
limitActivityNamesInCalendarBadges();

//mouseOver();

