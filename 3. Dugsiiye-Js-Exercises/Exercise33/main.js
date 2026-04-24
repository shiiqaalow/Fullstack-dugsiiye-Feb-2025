
const h1 = document.querySelector(".h1")
const p = document.querySelector("p")
function changeContent(){
    h1.innerHTML = "After <u>the button</u> is  clicked"
    p.textContent = "well done,you have made the change"
}