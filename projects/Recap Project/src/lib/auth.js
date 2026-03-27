import  supabase  from './supabase'

export const signUp = async (email,password,username='') =>{
    let { data,error } = await supabase.auth.signUp({
        email:email,
        password:password
    })
    console.log(data)

    if (error) {
        console.error("Signup error:", error);
        return { error };
    }

    // filtering the data from the user to create userProfile  

    if(data?.user){
        const { data:sessionData } = await supabase.auth.getSession()

        if(!sessionData?.session){
            console.log('We have sent your Confirmation link in your mailbox')
            return data
        }

        // getting user's name
        const displayName  = username || email.split('@')[0]

        // create profile
        const { data:profileData , error:profileError } = await supabase
        .from('users')
        .insert({
            id: data.user.id,
            username: displayName ,
            avatar_url: null
        })
        .select()
        .single()

        if(profileError){
            alert('profile creation error',profileError)
        }else{
            console.error('profile created successfully',profileData)
        }
    }
        
    return data
    

} 

export const signIn = async (email,password) => {
    let { data,error } = await supabase.auth.signInWithPassword({
        email:email,
        password:password
    })

    console.log('user info',data)

    if(error) throw error

    // check if the user profile exists , else not create it now

    if(data?.user) {
        try{
            const profile = await getUserProfile(data.user.id)
            console.log('profile info',profile)
        }catch(profileError){
            console.error('Error with profile during sign in',profileError)
        }
    }
}

export const getUserProfile = async (userId) => {

    const { data:sessionData } = await supabase.auth.getSession()

    const { data ,error } = await supabase.from('users')
    .select('*')
    .eq('id',userId)
    .single()

    if(error && error.code === 'PGRST116') {

        console.log('no profile found, attempting to create one for the user')

        const { data:userData } = await supabase.auth.getUser()

        const email = userData?.user.email
        const defaultUsername  = email ? email.split('@')[0] : `user_${Date.now()}`

        // create profile
        const { data:newProfile , error:profileError } = await supabase
        .from('users')
        .insert({
            id: userId,
            username: defaultUsername ,
            avatar_url: null
        })
        .select()
        .single()

        if(profileError){
            console.error('profile creation error',profileError)
            throw profileError
        }else{
            console.log('profile created successfully',newProfile)
        }

        return newProfile
    }

    if(error) {
        console.log('Error fetching profile',error)
        throw error
    }

    console.log('Existing profile')
    
    return data
}

export const onAuthChange = (callback) => {
    const {data} = supabase.auth.onAuthStateChange( (event,session) => {
        callback(session?.user || null, event)
    })
    return() => data.subscription.unsubscribe()
}

export const signOut = async () => {
    await supabase.auth.signOut()
}
