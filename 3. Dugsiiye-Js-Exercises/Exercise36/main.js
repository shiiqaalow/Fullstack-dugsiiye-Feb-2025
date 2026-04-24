const colorPicker = document.querySelector("#colorPicker");
const colorBox = document.querySelector("#colorBox");
const colorHistory = document.querySelector("#colorHistory");
const button = document.querySelector("#btn")


colorPicker.addEventListener("change",()=>{

    colorBox.style.backgroundColor = colorPicker.value;
    const newLi = document.createElement("li");
    newLi.style.color = colorPicker.value;
    newLi.textContent = colorPicker.value;
    colorHistory.appendChild(newLi);

})

    button.addEventListener('click', () => {
      colorHistory.textContent = ''; 
    });

