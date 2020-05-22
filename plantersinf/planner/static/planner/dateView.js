export const populateActivities = activities =>{
    activities.forEach(activity => {
        let html = `<tr class="date_row_${activity.id}">
        <th scope="row"><a class="text-danger remove" href='#' id='remove_${activity.id}'>X</a></th>
        <td><a href='#' id='go_${activity.id}'>${activity.name}</a></td>
        <td><span id='endtime_${activity.id}'>${activity.endtime}</span></td>
        <td><span class="text-success" id='time_${activity.id}'>0:00:00</span></td>
        <td><button class="btn btn-success" id="start_${activity.id}" >Start</button><button class="btn btn-primary" id="pause_${activity.id}" style="display: none;">Pause</button><button class="btn btn-danger" id="stop_${activity.id}" >Stop</button></td>
      </tr>`
        document.querySelector('.date_table').insertAdjacentHTML('beforeend',html);
        
    });
};

export const clearActivity = activity =>{
    document.querySelector(`.date_row_${activity.id}`).remove();
};

export const populateDropDownListOfActivities = activities =>{
    activities.forEach(activity =>{
        let html = `<a class="dropdown-item" href="#" id="${activity.id}">${activity.name}</a>`
        document.querySelector('.dropdown-menu').insertAdjacentHTML('beforeend', html)
    });
};

export const doesActivityExistInList = activity =>{
    
};