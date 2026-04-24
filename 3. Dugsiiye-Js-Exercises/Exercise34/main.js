
const ul = document.querySelector("ul")

function addItems(){
    const itemCusub = document.createElement("li")

    itemCusub.textContent=("items Cusub")

    ul.appendChild(itemCusub);

}

function removeItems(){

    if(ul.lastChild){
        ul.removeChild(ul.lastChild)
    }
    else{
        alert ( " Hey relax dude, NO more items left")
    }
   
}




