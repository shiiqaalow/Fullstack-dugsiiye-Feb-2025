"use server"

interface FormState {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    successMessage: string,
    errorMessage: string,
}

const greet = async (prevState: FormState, formData: FormData): Promise<FormState> => {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string


    if (!firstName || firstName.trim() === "") {
        return {firstName: firstName?? "",lastName: lastName?? "",email: email?? "",password: password?? "", successMessage: prevState.successMessage?? "" , errorMessage: 'First name is required' }
    }

    if (!lastName || lastName.trim() === "") {
        return {firstName: firstName?? "",lastName: lastName?? "",email: email?? "",password: password?? "", successMessage: prevState.successMessage?? "" , errorMessage: 'Last name is required' }
    }

    if (!email || email.trim() === "") {
        return {firstName: firstName?? "",lastName: lastName?? "",email: email?? "",password: password?? "", successMessage: prevState.successMessage?? "" , errorMessage: 'Email is required' }
    }

    if (!password || password.trim() === "") {
        return {firstName: firstName?? "",lastName: lastName?? "",email: email?? "",password: password?? "", successMessage: prevState.successMessage?? "" , errorMessage: 'password is required' }
    }else if (password.length < 6 ){
        return {firstName: firstName?? "",lastName: lastName?? "",email: email?? "",password: password?? "", successMessage: prevState.successMessage?? "" , errorMessage: 'password must be 6 or more characters' }
    }

    return { firstName, lastName, email, password, errorMessage: prevState.errorMessage?? "", successMessage: 'Thanks for submitting' }
}

export default greet