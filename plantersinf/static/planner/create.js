function newCategoryListener(){
    //checks category text box for valid information
    document.getElementById('category').addEventListener('keypress', event=>{
        
        if (event){
            //console.log(event.target);
            if(checkCategory(document.getElementById('category').value)){//category is valid
                //change href path to the valid category. check server sdie as well
                document.querySelector('.category-btn').href=`/add/${document.getElementById('category').value}`;
                
                
            }
            else{
                document.getElementById('category').value=null;
                document.getElementById('category').placeholder = "alphabet letters only";
                console.log(document.getElementById('category'))
                event.preventDefault();
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
                document.querySelector('.category-btn').href=`/add/${document.getElementById('category').value}`;
            }
            else{
                document.getElementById('category').value=null;
                document.getElementById('category').placeholder = "alphabet letters only";
                console.log('no numbers!')
                event.preventDefault();
                
                //document.getElementById('category').placeholder = "alphabet letters only";
                //document.getElementById('category').value='';
                //implementation needs work
            }
            //if (document.getElementById('category').value>='A' && document.getElementById('category').value<='z'){
            //    console.log(document.getElementById('category').value)
            //}
            
        }

    })

    
    //document.getElementById('categoryselection').addEventListener('click', event=>{
    //    console.log(event.target)
    //})
    //document.querySelector('.category_option').addEventListener('click',event=>{
    //    console.log(event.target)
    

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

function removeCategoryListener(){
    //       /remove/category/#fun
    document.getElementById('removecat').addEventListener('click', event=>{
        
        
        selectedcategory = document.getElementById('categoryselection').value
        //alters its own href to appropriate values based on whats selected
        document.getElementById('removecat').href=`/remove/category/${selectedcategory}`
    });
}

newCategoryListener();
removeCategoryListener();