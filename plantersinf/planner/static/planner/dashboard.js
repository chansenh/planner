function makePercentageChart(id,labellist,datalist,colorlist){
    //console.log(colorlist)
    let chartnode = document.getElementById(id).getContext('2d');//year-month-daynum-complete
    let chart = new Chart(chartnode, {
        type:'bar',
        data: {
            labels: labellist,//['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: 'Percentage Completed',
                data: datalist,//[12, 19, 3, 5, 2, 3],
                backgroundColor: colorlist,
                borderColor: colorlist,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


}

function makeCategoryChart(id,datavalues,datalabels,colorlist){
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

function renderEventCharts(eventvariablenode,month,year){
    let allactivedaynodes = eventvariablenode.querySelectorAll(`.${month}-${year}`);
    currentday=undefined;
    let labellist=[];
    let datalist=[];
    let colorlist=[];
    allactivedaynodes.forEach(currentdaynode =>{
        let color = currentdaynode.dataset.color;
        let completed = Number(currentdaynode.dataset.completed);
        let daynum = currentdaynode.id.split('-')[1];
        let activityname = currentdaynode.id.split('-')[0];
        if(currentday==undefined){
            currentday=Number(daynum);
        }
        
        if(currentday==Number(daynum)){//same day, continue gathering name and percentage data
            labellist.push(activityname);
            datalist.push(completed)
            colorlist.push(color)
        }else{//daynum as moved onto the next day. take new lists and feed them to generate chart
            makePercentageChart(`${month}-${year}-${currentday}-event`,labellist,datalist,colorlist)
            console.log(datalist)
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
        let daynum = currentdaynode.id.split('-')[1]; //daynum marks day position of main loop
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
function populateCharts(){
    //find active month in sidebar
    let activemonthnodes = document.getElementById('calendar').querySelectorAll('.active')
    activemonthnodes.forEach(activemonth =>{
        let month = activemonth.id.split('_')[0];
        let year = activemonth.id.split('_')[1];
        let eventvariablenode = document.getElementById(`${month}-${year}-eventvars`);
        let categoryvariablenode = document.getElementById(`${month}-${year}-categoryvars`);
        renderEventCharts(eventvariablenode,month,year)
        renderCategoryCharts(categoryvariablenode,month,year)
        document.getElementById(`${month}-${year}`).style.display = 'block';
    });
    //retreive data associated with active month; id=year-month-chartvars, display none
    
    //use data attributes completed and name put them in two separte lists in the same order
    //make charts for each day in the month and show it 

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

function showWeeklyEvents(weeknumber){
    document.querySelectorAll(`.eventchart`).forEach(daynode =>{
        let daynodenumber = Number(daynode.id.split('-')[2])

        if(7*(weeknumber-1)+1<=daynodenumber && daynodenumber<=7*weeknumber){
            daynode.style.display='block';
        }else{
            //hide it
            //daynode.style.display='none';
        }
    });
}

function showWeeklyCategories(weeknumber){
    document.querySelectorAll(`.categorychart`).forEach(daynode =>{
        let daynodenumber = Number(daynode.id.split('-')[2])

        if(7*(weeknumber-1)+1<=daynodenumber && daynodenumber<=7*weeknumber){
            daynode.style.display='block';
        }else{
            //hide it
            //daynode.style.display='none';
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
            //activate/deactivate active class
            document.getElementById(parentnode.id).querySelector('.active').classList.remove('active');
            targetnode.classList.add('active');

            //make user choice visible
            if(targetnode.innerHTML=='none'){
                document.getElementById(`navbar${parentnode.id}`).innerHTML = parentnode.id
            }else{
                document.getElementById(`navbar${parentnode.id}`).innerHTML = targetnode.innerHTML
            }
        }
        let activeweek = Number(document.getElementById(`week`).querySelector('.active').id);
        let activeday = Number(document.getElementById(`day`).querySelector('.active').id);

        //either choice specifics that all should be shown
        if(activeweek==0 || activeday==0){
            typeChoice().forEach(choice =>{
                alterChart(`${choice}chart`,'block');
            });
        //only show day choice, week choice is none
        }else if(activeweek==-1){
            typeChoice().forEach(choice =>{
                if(choice=='event'){
                    showDayEvents(activeday);
                }
                if(choice=='category'){
                    showDayCategories(activeday);
                }
            });
        //only show week choice, day choice is none
        }else if(activeday==-1){
            typeChoice().forEach(choice =>{
                if(choice=='event'){
                    showWeeklyEvents(activeweek)
                }
                if(choice=='category'){
                    showWeeklyCategories(activeweek)
                }
            });
        }
        //specific week and day are selected
        else{
            //and individual day number/week number selected
            //check for what type is selected 
            typeChoice().forEach(choice =>{
                if(choice=='event'){
                    showDayEvents(activeday);
                    showWeeklyEvents(activeweek)        
                }
                if(choice=='category'){
                    showDayCategories(activeday);
                    showWeeklyCategories(activeweek)        
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


