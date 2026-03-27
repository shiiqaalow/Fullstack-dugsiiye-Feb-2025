// const btn1 = document.querySelector(".btn1")
// const btn2 = document.querySelector(".btn2")

// function handleClick() {
//     console.log("button clicked")
// }

// btn1.addEventListener("click", handleClick);

// btn2.addEventListener("click",function(){
//     btn1.removeEventListener("click", handleClick)
//     console.log("function removed")
// })

// const selectColor = document.querySelector("#color")
// const selectedColor = document.querySelector("#selectedColor")

// selectColor.addEventListener("change", function(){
//     console.log("Change To :", selectColor.value);
//     selectedColor.textContent = `Selected Color : ${selectColor.value}`
// })

//     const form =document.querySelector("#form");

// form.addEventListener("submit", function(){

//     const username = document.querySelector("#userName").value;
//     const email = document.querySelector("#email").value;
//     const password = document.querySelector("#password").value;
//     const p = document.querySelector("#submitResult");

//     event.preventDefault();

//     if(username ===""){
//         p.textContent = "Username Required";
//         return
//     }

//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//    if(!email.match(emailPattern)){
//     p.textContent = "wrong"
//     return
//    }
   
//     p.textContent = "registered Successfully"
// })


const form = document.querySelector("#form")
const username = document.querySelector("#username")
const Email = document.querySelector("#Email")
const password = document.querySelector("#password")
const confirmPassword = document.querySelector("#confirmPassword")
const error = document.querySelector("#error")
const success = document.querySelector("#success")


form.addEventListener("submit",(e)=>{
    e.preventDefault()

    error.textContent =""
    success.textContent =""

    const isUsernameValid = validateUsername()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    const isConfirmPasswordValid = validateConfirmPassword()

    if(!isUsernameValid){
        username.focus()
        return
    }
    else if(!isEmailValid){
        Email.focus()
        return
    }
    else if (!isPasswordValid){
        password.focus()
        return
    }
    else if (!isConfirmPasswordValid){
        confirmPassword.focus()
        return
    }

    success.textContent = "registration successful"
})

function validateUsername(){
    if (username.value.trim()===""){
        setError(username,"username is required")
        return false
    }
    else{
        setSuccess(username)
        return true
    }
}

function validateEmail(){
    const EmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!Email.value.match(EmailPattern)){
        setError(Email,"please enter valid Email");
        return false
    }
    else{
        setSuccess(Email)
        return true
    }
}

function validatePassword(){
    if(password.value.trim().length <8){
        setError(password," your password must be at-least 8 characters")
        return false
    }
    if(password.value.length >8){
        setError(password," your password must not be more than 8 characters")
        return false
    }
    else{
        setSuccess(password)
        return true
    }
}

function validateConfirmPassword(){
    if(password.value.trim()===""||confirmPassword.value.trim()===""){
        setError(confirmPassword,"the password did not match")
        return false
    }


    if(!confirmPassword.value.match (password.value)){
        setError(confirmPassword,"the password did not match")
        return false
    }
    else{
        setSuccess(confirmPassword)
        return true
    }
}


 function setError (element,massage) {
    element.classList.add("invalid")
    element.classList.remove("valid")
    error.textContent = massage
}
 function setSuccess (element) {
    element.classList.add("valid")
    element.classList.remove("invalid")
}