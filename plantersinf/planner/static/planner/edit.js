function preselectActivityDays(){
    console.log('loading selected days')
    if(document.querySelector('.days')){
        document.querySelectorAll('.days').forEach(daybtn =>{
            if(daybtn){
                let day = daybtn.querySelector('.day');
                if(day.value=='1'){
                    console.log('active')
                    //document.getElementById(daybtn.id).classList.add('active');
                    if(document.getElementById(daybtn.id)){
                        document.getElementById(daybtn.id).classList.add('active');
                        document.getElementById(day.id).checked=true;
                    }
                    

                }
            }
            
        })
    }
}

function dayButtonListeners(){
    console.log('on to buttons')
    document.querySelector('.dotw').addEventListener('click', event =>{
        //event.preventDefault();
        console.log(event.target)
        let btnid=event.target.id
        if(validateDays(btnid)){
            let labelnode = document.getElementById(btnid);
            let daynode = labelnode.querySelector('.day');
            //btn was previously active; will be changing to unactive. change child nodes value property to 0 to account 
            if(classInClassList(labelnode,'active')){
                document.getElementById(labelnode.id).classList.remove('active');
                document.getElementById(daynode.id).value = 0;
                document.getElementById(daynode.id).checked = false;

            }
            //btn was inactive now turning active. change value property to 1
            else{
                document.getElementById(labelnode.id).classList.add('active');
                document.getElementById(daynode.id).value = 1;
                document.getElementById(daynode.id).checked = true;
                
            }
        }
    });
    console.log('finish btns')
}
function validateDays(id){
    let days=['mon','tue','wed','thu','fri','sat','sun',]
    let result=false
    days.forEach(day =>{
        if(id==day){
            result=true
        }
    })
    return result
}

function classInClassList(node,search){
    let result = false;
    node.classList.forEach(eachclass =>{
        
        if(eachclass==search){
            result = true;
        }
    })
    return result
}



function windowListeners(){
    console.log('when windowloads')
    window.addEventListener('DOMContentLoaded', event=>{
        if(event){
            console.log('populate dotw')
            preselectActivityDays()
            dayButtonListeners();
        }
    });
}

function pageListeners(){
    console.log('turning on page listeners')
    windowListeners();
    
    console.log('finsih page listeners')
}

function editListener(){
    document.getElementById('alleventsbtn').addEventListener('click',event=>{
        //console.log(event.target)
        let node = event.target;
        let targetid = event.target.id;
        if(targetid){
            if(node.innerHTML=='Yes'){
                //turn off
                node.innerHTML='No';
                document.getElementById('alleventsvalue').value='0'
                node.classList.remove('btn-success');
                node.classList.add('btn-seconday');
                
            }
            else{
                //turn on
                node.innerHTML='Yes';
                document.getElementById('alleventsvalue').value='1'
                document.getElementById('futureeventsvalue').value='0'
                node.classList.remove('btn-seconday');
                node.classList.add('btn-success');
                //turn off future events button 
                document.getElementById('futureeventsvalue').value='0'
                document.getElementById('futureeventsbtn').classList.remove('btn-success');
                document.getElementById('futureeventsbtn').classList.add('btn-seconday');
                document.getElementById('futureeventsbtn').innerHTML='No'
                document.getElementById('sdate').removeAttribute('readonly')
                document.getElementById('name').removeAttribute('readonly')
            }
        }
    })

    document.getElementById('futureeventsbtn').addEventListener('click',event=>{
        //console.log(event.target)
        let node = event.target;
        let targetid = event.target.id;
        if(targetid){
            if(node.innerHTML=='Yes'){
                //turn off
                node.innerHTML='No';
                document.getElementById('futureeventsvalue').value='0'
                node.classList.remove('btn-success');
                node.classList.add('btn-seconday');
                
            }
            else{
                //turn on
                node.innerHTML='Yes';
                document.getElementById('futureeventsvalue').value='1'
                node.classList.remove('btn-seconday');
                node.classList.add('btn-success');
                document.getElementById('sdate').setAttribute('readonly',true)
                document.getElementById('name').setAttribute('readonly',true)
                //turn off all events button 
                document.getElementById('alleventsvalue').value='0'
                document.getElementById('alleventsbtn').classList.remove('btn-success');
                document.getElementById('alleventsbtn').classList.add('btn-seconday');
                document.getElementById('alleventsbtn').innerHTML='No'

            }
        }
    })

    

}

function checkForTime(){

}

function submitListener(){
    document.querySelector('.submitbtn').addEventListener('click',event=>{
        
        const start = document.getElementById('start_time').value;
        const end = document.getElementById('end_time').value;
        if(!start || !end){
            event.preventDefault()
            console.log('no time')
        }
        else{
            document.getElementById('.submitbtn').click();
        }
    });
}

//must add listener that adds categories to list
pageListeners();
editListener();
submitListener();


