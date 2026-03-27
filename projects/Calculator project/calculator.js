const calculator = document.querySelector(".form")
const calculatorInput = document.querySelector(".input");
const buttons = document.querySelectorAll("button");
const cleaeBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
calculatorInput.value = "0"

calculator.addEventListener("submit",addTask);
function addTask(e){
    e.preventDefault()
}

buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        const result = button.textContent;
        console.log(result)

        if(result === "c"){
            calculatorInput.value = "0"
        }else if(result === "="){
            try {
                calculatorInput.value = eval(calculatorInput.value)
            }catch{
                calculatorInput.value = "Invalid Maths!"
            }
        }else if (result === "del") {
            calculatorInput.value = calculatorInput.value.slice(0,-1)
        }

        else {
        // this syntax is copied form chatGpt
      // If current value is 0 and user presses a number, replace it
        const isNumber = /^[0-9]$/.test(result);

      if (calculatorInput.value === "0" && isNumber) {
        calculatorInput.value = result; // replace 0
      }
        // this syntax is copied form chatGpt^^^^
        else {
            // calculatorInput.value = ""
            calculatorInput.value += result
        }
    }
    })
   
})
