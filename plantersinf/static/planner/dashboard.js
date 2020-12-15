function makePercentageChart(id,labellist,datalist,colorlist){
    //console.log(colorlist)
    labellist = labellist.map(label =>{
        if(label.length>15){
            let shorterstring=label.slice(0,14)+'...';
            return shorterstring
        }else{
            return label
        }
        
    });
    let chartnode = document.getElementById(id).getContext('2d');//year-month-daynum-complete
    let chart = new Chart(chartnode, {
        type:'bar',
        data: {
            labels: labellist,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Minutes',
                data: datalist,//[12, 19, 3, 5, 2, 3],
                backgroundColor: colorlist,
                borderColor: colorlist,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    gridLines:{
                        offsetGridLines: true
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


}

function makeCategoryChart(id,datavalues,datalabels,colorlist){

    datalabels = datalabels.map(label =>{
        if(label.length>4){
            let shorterstring=label.slice(0,4)+'...';
            return shorterstring
        }else{
            return label
        }
        
    });

    let chartnode = document.getElementById(id).getContext('2d');//year-month-daynum-complete
    let options=""

    let data = {
        datasets: [{
            data: datavalues,
            backgroundColor: colorlist
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: datalabels
    };

    new Chart(chartnode, {
        data: data,
        type: 'polarArea',
        options: options
    });

}

function hideAllCharts(){
    let allchartnodes = document.querySelectorAll('.monthchart');
    allchartnodes.forEach(chartnode =>{
        chartnode.style.display='none';
    });
}
//use data attributes completed and name put them in two separte lists in the same order
function renderEventCharts(eventvariablenode,month,year){
    let allactivedaynodes = eventvariablenode.querySelectorAll(`.${month}-${year}`);
    currentday=undefined;
    let labellist=[];
    let datalist=[];
    let colorlist=[];
    allactivedaynodes.forEach(currentdaynode =>{
        let color = currentdaynode.dataset.color;
        let completed = Number(currentdaynode.dataset.completed);
        let daynum = currentdaynode.dataset.daynumber;
        let activityname = currentdaynode.dataset.name;
        if(currentday==undefined){
            currentday=Number(daynum);
        }
        
        if(currentday==Number(daynum)){//same day, continue gathering name and percentage data
            labellist.push(activityname);
            datalist.push(completed)
            colorlist.push(color)
        }else{//daynum as moved onto the next day. take new lists and feed them to generate chart
            makePercentageChart(`${month}-${year}-${currentday}-event`,labellist,datalist,colorlist)
            //console.log(datalist)
            //reset list variables
            labellist=[]
            datalist=[]
            colorlist=[]
            //change currentday number to new daynum
            currentday=Number(daynum)
            //add currentdaynodes information to the newly reset list variables
            labellist.push(activityname);
            datalist.push(completed)
            colorlist.push(color)
        }
    });
}
function renderCategoryCharts(categoryvariablenode,month,year){
    let allactivedaynodes = categoryvariablenode.querySelectorAll(`.${month}-${year}`);
    currentday=undefined;
    let labellist=[];
    let datalist=[];
    let colorlist=[];
    allactivedaynodes.forEach(currentdaynode =>{
        let color = currentdaynode.dataset.color;
        let categorycount = Number(currentdaynode.dataset.occuring);
        let name = currentdaynode.dataset.name;
        let daynum = currentdaynode.dataset.daynumber; //daynum marks day position of main loop
        if(currentday==undefined){
            currentday=Number(daynum); //current day is used to mark all subsequent same days within main loop
        }                              //current day will follow when daynum's value differs from previous same values
        
        if(currentday!=Number(daynum)){//the current particular day is done, daynum has moved forward in count. feed all variables to categorychart function
            makeCategoryChart(`${month}-${year}-${currentday}-category`,datalist,labellist,colorlist)
            //reset list variables
            labellist=[]
            datalist=[]
            colorlist=[]
            //change currentday number to new daynum
            currentday=Number(daynum)
            //add currentdaynodes information to the newly reset list variables
            labellist.push(name);
            datalist.push(categorycount)
            colorlist.push(color)
        }else{//day is same, gather current values and add it to the pile of data that camebefore it
            labellist.push(name);
            datalist.push(categorycount)
            colorlist.push(color)
            
            
        }
    });
}

function renderWeekCharts(){
    //grab active week selection and make it so based on selected id
    const activeid = Number(document.getElementById('week').querySelector('.active').id);
    if(activeid==0){
        [1,2,3,4,5].forEach(weeknumber=>{
            typeChoice().forEach(choice =>{
                if(choice=='event'){
                    showWeeklyEvents(weeknumber);
                }
                if(choice=='category'){
                    showWeeklyCategories(weeknumber);
                }
            });
        });
    }
    if(activeid>0){
        typeChoice().forEach(choice =>{
            if(choice=='event'){
                showWeeklyEvents(activeid);
            }
            if(choice=='category'){
                showWeeklyCategories(activeid);
            }
        });
    }
    

}



//retreive data associated with active month; id=year-month-chartvars, display none
function populateCharts(){
    //find active month in sidebar
    let activemonthnodes = document.getElementById('calendar').querySelectorAll('.active')
    //make charts for each day in the month and show it 
    activemonthnodes.forEach(activemonth =>{
        let month = activemonth.id.split('_')[0];
        let year = activemonth.id.split('_')[1];
        let eventvariablenode = document.getElementById(`${month}-${year}-eventvars`);
        let categoryvariablenode = document.getElementById(`${month}-${year}-categoryvars`);
        renderEventCharts(eventvariablenode,month,year)
        renderCategoryCharts(categoryvariablenode,month,year)
        document.getElementById(`${month}-${year}`).style.display = 'block';
    });
    renderWeekCharts();
    
    
    

}


function renderCurrentYear(){

    const currentdateobj = getCurrentDateObject();
    document.getElementById(currentdateobj.year).style.display = "block";
    document.getElementById(`${currentdateobj.month}_${currentdateobj.year}`).classList.add(`active`);
    populateCharts();
    resizeCanvas("200px","200px");
    //document.getElementById(`${currentdateobj.month}_${currentdateobj.year}`).checked=true;

}

function toggleActiveMonth(){
    document.querySelector('.calendar').addEventListener('click', event=>{
        let targetnode = event.target;
        let isValid=false;
        targetnode.classList.forEach(element => {
            if(element=='month'){
                isValid=true;
            }
        });
        if(isValid){
            
            document.getElementById(targetnode.id).classList.toggle('active');
            hideAllCharts();
            populateCharts();
            resizeCanvas("200px","200px");
        }
    });
    
}

function calendarControl(){
    document.querySelector(`.sidebar`).addEventListener('click', event =>{
        const targetnode = event.target
        
        let id = targetnode.parentNode.id;
        if(id){
            let year = Number(id.split('_')[1]);
            //go back a year
            if(targetnode.id=="prev" && document.getElementById(`${year-1}`)){
                let id = targetnode.parentNode.id;
                let year = Number(id.split('_')[1]);
                document.getElementById(`${year}`).style.display = "none";
                document.getElementById(`${year-1}`).style.display = "block";
            }
            //go forward a year
            if(targetnode.id=="next" && document.getElementById(`${year+1}`)){
                let id = targetnode.parentNode.id;
                let year = Number(id.split('_')[1]);
                document.getElementById(`${year}`).style.display = "none";
                document.getElementById(`${year+1}`).style.display = "block";
            }
        }
        
    });
}

function showDayEvents(daynumber){
    document.querySelectorAll(`.eventchart`).forEach(daynode =>{
        let daynodenumber = Number(daynode.id.split('-')[2])
        if(daynumber==daynodenumber){
            daynode.style.display='block';
        }else{
            //hide it
            //daynode.style.display='none';
        }
    });
}

function showDayCategories(daynumber){
    document.querySelectorAll(`.categorychart`).forEach(daynode =>{
        let daynodenumber = Number(daynode.id.split('-')[2])
        if(daynumber==daynodenumber){
            daynode.style.display='block';
        }else{
            //hide it
            //daynode.style.display='none';
        }
    });
}

//condense week from individual activities from each day in the week
function showWeeklyEvents(weeknumber){
    //for each active month, for each day within the given week number, for each activity within a day
    // add up completed mintues and add to activity's total
    
    document.getElementById(`calendar`).querySelectorAll(`.active`).forEach(activebutton =>{
        let year = Number(activebutton.id.split('_')[1]);
        let month = activebutton.id.split('_')[0];
        let nodedata={}
        document.getElementById(`${month}-${year}-eventvars`).querySelectorAll(`.${month}-${year}`).forEach(activitynode =>{
            //let name = activitynode.id.split('-')[0]
            let daynumber = Number(activitynode.dataset.daynumber)
            if(7*(weeknumber-1)+1<=daynumber && daynumber<=7*weeknumber){
                //add name,completed,color to dataset object
                const activityname = activitynode.dataset.name;
                let completed = Number(activitynode.dataset.completed);
                const color = activitynode.dataset.color;
                // create name entry object with completed and color initialized
                if(!(activityname in nodedata)){
                    nodedata[activityname]={'completed':completed,'color':color}    
                }else{
                    // name exists in nodedata, add completed to existing completed key    
                    
                    nodedata[activityname]['completed']+=completed
                }
                //console.log(nodedata)
                
            }
        });
        
        let labellist=[]
        let datalist=[]
        let colorlist=[]
        Object.entries(nodedata).forEach((entry) =>{       
            
            
            labellist.push(entry[0])
            datalist.push(entry[1].completed)
            colorlist.push(entry[1].color)
            
        });
        
        if(labellist[0]){
            //create html chart element to hold week chart
            const id = `${month}-${year}-week${weeknumber}`;
            const htmlstring = `<div class="weekeventchart mb-5 border border-right-0 pl-3 ml-1 shadow-sm" id="${id}-event" style="display: none;">
                                    <div style="height: 250px; width: 200px;">
                                        
                                        <p>Week ${weeknumber}</p>
                                        <canvas class="canvas" id="${id}-eventweek" style="width: 200px; height: 200px;"></canvas>		

                                    </div>
                                </div>`
            document.getElementById(`${month}-${year}-charts`).querySelector('.weekeventbox').insertAdjacentHTML('beforeend',htmlstring)
            //produce graphs for current month with nodedata holding variables
            
            
            //console.log(id)
            //console.log(labellist)
            //console.log(datalist)
            //console.log(colorlist)
            makePercentageChart(`${id}-eventweek`,labellist,datalist,colorlist);
            document.getElementById(`${id}-event`).style.display='block';
        }
        
        
    });
}

function showWeeklyCategories(weeknumber){
    document.getElementById(`calendar`).querySelectorAll(`.active`).forEach(activebutton =>{
        let year = Number(activebutton.id.split('_')[1]);
        let month = activebutton.id.split('_')[0];
        let nodedata={}
        document.getElementById(`${month}-${year}-categoryvars`).querySelectorAll(`.${month}-${year}`).forEach(categorynode =>{
            //let name = activitynode.id.split('-')[0]
            let daynumber = Number(categorynode.dataset.daynumber)
            if(7*(weeknumber-1)+1<=daynumber && daynumber<=7*weeknumber){
                //add name,completed,color to dataset object
                const categoryname = categorynode.dataset.name;
                let occuring = Number(categorynode.dataset.occuring);
                const color = categorynode.dataset.color;
                // create name entry object with completed and color initialized
                if(!(categoryname in nodedata)){
                    nodedata[categoryname]={'occuring':occuring,'color':color}    
                }else{
                    // name exists in nodedata, add completed to existing completed key    
                    
                    nodedata[categoryname]['occuring']+=occuring
                }
                //console.log(nodedata)
                
            }
        });
        
        let labellist=[]
        let datalist=[]
        let colorlist=[]
        Object.entries(nodedata).forEach((entry) =>{        
            labellist.push(entry[0])
            datalist.push(entry[1].occuring)
            colorlist.push(entry[1].color)
            
        });
        
        if(labellist[0]){
            //create html chart element to hold week chart
            const id = `${month}-${year}-week${weeknumber}`;
            const htmlstring = `<div class="weekcategorychart mb-5 border border-left-0 pr-3 mr-1 shadow-sm" id="${id}-category" style="display: none;">
                                    <div style="height: 250px; width: 200px;">
                                        
                                        <p class="pl-4">Week ${weeknumber}</p>
                                        <canvas class="canvas" id="${id}-categoryweek" style="width: 200px; height: 200px;"></canvas>		
                                    
                                    </div>
                                </div>`
            document.getElementById(`${month}-${year}-charts`).querySelector('.weekcategorybox').insertAdjacentHTML('beforeend',htmlstring)
            //produce graphs for current month with nodedata holding variables
            
            
            //console.log(id)
            //console.log(labellist)
            //console.log(datalist)
            //console.log(colorlist)
            makeCategoryChart(`${id}-categoryweek`,datalist,labellist,colorlist);
            document.getElementById(`${id}-category`).style.display='block';
        }
        
    });
}

function hideEverything(){
    document.querySelectorAll('.categorychart').forEach(chart =>{
        chart.style.display = 'none'
    });

    document.querySelectorAll('.eventchart').forEach(chart =>{
        chart.style.display = 'none'
    });
    document.querySelectorAll('.weekeventchart').forEach(chart =>{
        //chart.style.display = 'none'
        let element = document.getElementById(chart.id);
        element.parentNode.removeChild(element);
    });
    document.querySelectorAll('.weekcategorychart').forEach(chart =>{
        //chart.style.display = 'none'
        let element = document.getElementById(chart.id);
        element.parentNode.removeChild(element);
    });
}

function optionControl(){

    document.getElementById('option').addEventListener('click', event=>{
        //hides any previous choices
        hideEverything();
        //target is selection of a link tag <a> in dropdownlists of either week or day
        const targetnode= event.target;
        //parent is div section of dropdown-menu
        const parentnode = targetnode.parentNode;
        if(parentnode.id=='day' || parentnode.id=='week' || parentnode.id=='type'){
            
            //page inits with none (-1) active. active daynode id is not either -1 nor 0
            let init = []
            if(parentnode.id=='day'){
                
                document.getElementById(parentnode.id).querySelectorAll('.active').forEach(currentnode =>{
                    init.push(Number(currentnode.id));
                });
            }
            //                                                  indicates either none or all days are selected
           
            if(parentnode.id=='day' && Number(targetnode.id)>0 && !init.includes(-1) && !init.includes(0)){
                //multiple specific days can be viewed at any time 
                targetnode.classList.toggle('active');
            }else{
                //week and type choices are limited to one
                // in the case of having multiple days selected, remove active classes from 1 or more nodes
                document.getElementById(parentnode.id).querySelectorAll('.active').forEach(currentnode =>{
                    currentnode.classList.remove('active');
                });
                targetnode.classList.add('active');
            }
            
            //document.getElementById(parentnode.id).querySelector('.active').classList.remove('active');

            //make user choice visible
            if(targetnode.innerHTML=='none'){
                document.getElementById(`navbar${parentnode.id}`).innerHTML = parentnode.id
            }else{
                document.getElementById(`navbar${parentnode.id}`).innerHTML = targetnode.innerHTML
            }
        }
        let activedays=[]
        let activeweek = Number(document.getElementById(`week`).querySelector('.active').id);
        document.getElementById(`day`).querySelectorAll('.active').forEach(daynode =>{
            activedays.push(Number(daynode.id));
        });

        //all days selected
        if(activedays.includes(0)){
            typeChoice().forEach(choice =>{
                alterChart(`${choice}chart`,'block');
            });
        }
        //const id = `${month}-${year}-week${weeknumber}`;
        //all weeks sleceted
        if(activeweek==0){
            [1,2,3,4,5].forEach(weeknumber=>{
                typeChoice().forEach(choice =>{
                    if(choice=='event'){
                        showWeeklyEvents(weeknumber);
                    }
                    if(choice=='category'){
                        showWeeklyCategories(weeknumber);
                    }
                });
            });
        }
        //only show day choice, week choice is none
        if(activeweek==-1){
            typeChoice().forEach(choice =>{
                if(choice=='event' && document.querySelectorAll('.weekeventchart')){
                    //showDayEvents(activeday);
                    document.querySelectorAll('.weekeventchart').forEach(chart =>{
                        //chart.style.display = 'none'
                        let element = document.getElementById(chart.id);
                        element.parentNode.removeChild(element);
                    });
                    
                }
                if(choice=='category' && document.querySelectorAll('.weekcategorychart')){
                    //showDayCategories(activeday);
                    document.querySelectorAll('.weekcategorychart').forEach(chart =>{
                        //chart.style.display = 'none'
                        let element = document.getElementById(chart.id);
                        element.parentNode.removeChild(element);
                    });
                }
            });
        //only show week choice, day choice is none
        }
        if(activedays.includes(-1)){

            typeChoice().forEach(choice =>{
                if(choice=='event'){
                    //showWeeklyEvents(activeweek)
                    document.querySelectorAll('.eventchart').forEach(chart =>{
                        chart.style.display = 'none'
                    });
                }
                if(choice=='category'){
                    document.querySelectorAll('.categorychart').forEach(chart =>{
                        chart.style.display = 'none'
                    });
                    //showWeeklyCategories(activeweek)
                }
            });
        }
        //specific week and day are selected
        if(!activedays.includes(0) && !activedays.includes(-1)){
            //and individual day number/week number selected
            //check for what type is selected 
            typeChoice().forEach(choice =>{
                if(choice=='event'){
                    activedays.forEach(activeday =>{
                        showDayEvents(activeday);    
                    });
                    
                    
                }
                if(choice=='category'){
                    activedays.forEach(activeday =>{
                        showDayCategories(activeday);    
                    });
                    
                }
            });
            
        }
        if(activeweek>0){
            //and individual day number/week number selected
            //check for what type is selected 
            typeChoice().forEach(choice =>{
                if(choice=='event'){
                    showWeeklyEvents(activeweek);
                }
                if(choice=='category'){
                    showWeeklyCategories(activeweek);        
                }
            });
            
        }
    });
    
}

//grabs active category type to show. returns a list, max list being ['event','category']
function typeChoice(){
    //find active type
    let activetypenode = document.getElementById('type').querySelector('.active');
    if(activetypenode.id=='all'){
        return ['event','category']
    }else{
        return [activetypenode.id]
    }
}

function alterChart(chartclass,displaystring){
    document.querySelectorAll(`.${chartclass}`).forEach(chartnode =>{
        chartnode.style.display = displaystring;
    });
}

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

function resizeCanvas(width,height){

        document.querySelectorAll(`.canvas`).forEach(canvas =>{
            canvas.style.width=width;
            canvas.style.height=height;
        });
}

function fixCanvasOnResize(){
    window.addEventListener('resize', ()=>{
        resizeCanvas("200px","200px");
    });
}
renderCurrentYear();
toggleActiveMonth();
calendarControl();
optionControl();
//fixCanvasOnResize();
//makeChart('chart1');
//makeChart('chart2');


