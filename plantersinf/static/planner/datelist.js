let calendarList=[];

function buildCalendarList(){
    let objcount = 0;
    document.querySelectorAll('.month').forEach(monthnode =>{
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
    console.log('====ACTIVES=====')
    console.log(listofactivecategories)
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
            let activemonthid = document.querySelector(`.active`).id.split('-')[0];
            let activeyearid = Number(document.querySelector(`.active`).id.split('-')[1]);

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
            let activemonthid = document.querySelector(`.active`).id.split('-')[0];
            let activeyearid = Number(document.querySelector(`.active`).id.split('-')[1]);
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
            'next': 'february',
            'prev': 'december',
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
    let active = document.querySelector('.active')
    console.log(active)
    if (active){
        return true
    }
    return false
}

function getActive(){
    let month = document.querySelector('.active').id.split('-')[0]
    let year = document.querySelector('.active').id.split('-')[1]
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

//pageLoad();
buildCalendarList();
//console.log(calendarList);
let month = calendarList[0]['id'].split('-')[0];
let year = calendarList[0]['id'].split('-')[1];
if (!checkActive()){//if there is no active month then server did not render active
    makeMonthActive(month,year); //makes first month active
}
else{
    let active = getActive()
    makeMonthActive(active.month,active.year);
}

function hightlightCurrentDay(){
    let d = new Date();
    let day = d.getDate();
    months=['january','february','march','april','may','june','july','august','september','october','november','december'];
    let month = months[d.getMonth()];
    document.getElementById(`${month}${day}`).parentNode.classList.add('border-danger','border','shadow-sm');
    
}

function dayListener(){
    document.querySelectorAll(`.calendar`).forEach(calendarmonth => {
        calendarmonth.addEventListener('click',event=>{
            console.log(event.target);
            const node = event.target;
            //if clicked node has a link within it, execute the link
            if(node.getElementsByTagName('A').length != 0){
                const daylink = node.getElementsByTagName('A')[0]; //only one link exists for any single day. manually select the first one
                daylink.click()
            }
            
            const week = ['mon','tue','wed','thu','fri','sat','sun'];
            let day="";
            node.classList.forEach(clas =>{
                if(clas=="activity"){
                    let editactivity = document.createElement('a');
                    editactivity.href = `/edit/${node.id}`
                    editactivity.click()
                }
            })
            console.log(day)
        });
    });
    
        
}

calendarNavigation(calendarList);
enableFiltering();
hightlightCurrentDay();
dayListener();
//mouseOver();

