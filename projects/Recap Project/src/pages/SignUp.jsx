import {Eye,EyeOff, Lock, Mail, User,Check} from "lucide-react";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import {signUp} from '../lib/auth'

const SignUp = () => {
    const {  register, handleSubmit, watch, formState: { errors } } = useForm()
    const [ isLoading,setIsLoading ] =useState(false)
    const [ showPassword,setShowPassword ] =useState(false)
    const [ showConfirmPassword,setShowConfirmPassword ] =useState(false)
    const [ status,setStatus ] =useState(null)


    const matchPassword = (watch) => (value) =>
    value === watch("password") || "Passwords do not match";

    const navigate = useNavigate()
   
    const onSubmit = async (data) => {

        // 1️⃣ send data to supabase
        await signUp(data.email,data.password,data.username)
        
        // 2️⃣ First show success message instantly
        const isSuccess = true;
        setStatus(isSuccess ? "success" : "error");
   
        // 3️⃣ Wait before showing loading animation
        await new Promise((resolve) => setTimeout(resolve, 1000));
   
        // 4️⃣ Now show loading modal
        setIsLoading(true);
   
        // 5️⃣ Wait during loading
        await new Promise((resolve) => setTimeout(resolve, 1000));
   
        // 6️⃣ Hide loading
        setIsLoading(false);

        // 7 Navigate
        if(isSuccess){
            navigate("/signin");
        }
    };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
        {status === 'success' && (
            <div className="absolute right-2 top-20 sm:right-50 sm:top-30  bg-gray-200 px-4 py-2 flex items-center gap-2 rounded-lg">
                <div className="bg-green-400 w-6 h-6 flex justify-center items-center shadow-md animate-fadeIn rounded-full">
                    <Check size={18} color="white"/>
                </div>
                <div className="">
                    <p className="text-gray-900 font-bold text-md">You have successfully created an account</p>
                </div>
                 <div 
                className="absolute -left-1 -top-1 bg-red-700 rounded-full cursor-pointer"
                onClick={()=>setStatus(false)}
                >
                    <X size={18} color="white"/>
                </div>
            </div>
        )}
        <div className="max-w-md w-full">
            <div className="text-center">
                <h1 className="text-3xl text-gray-900 font-bold">Create an account</h1>
                <p className="text-gray-600 mt-3">Join our community and start sharing your ideas</p>
            </div>
            <div className=" bg-white shadow-lg p-8  rounded-md mt-5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {isLoading && (
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
                            <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center justify-center animate-fadeIn">
                            <div className="w-14 h-14 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="mt-5 text-orange-600 text-xl font-semibold">
                                Creating Account...
                            </p>
                            </div>
                        </div>
                    )}

                    {/* email */}
                    <div className="">
                        <label htmlFor="username">Email Address</label>
                        <div className="relative">
                            <input 
                            className=" pl-10 py-2 border-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-600 rounded-md w-full"
                                type="email"
                                placeholder="you@gmail.com"
                                {...register('email',{
                                    required:'Email is required',
                                    pattern:{
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message:'Email is invalid ⚠️'
                                    },
                                })}
                            />
                            <div className="absolute left-2 bottom-2  text-gray-600">
                                <Mail/>
                            </div>
                        </div>

                        {errors.email &&( 
                            <p className='  text-red-500'>{errors.email.message}</p>
                        )}
                    </div>
                    {/* Username */}
                    <div className="">
                        <label htmlFor="password">Username</label>
                        <div className="relative">
                            <input 
                            className=" pl-10 py-2 border-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-600 rounded-md w-full"
                                type="text"
                                placeholder="Johndoe"
                                {...register('username',{
                                    required:'username is required',
                                    pattern:{
                                        value: /^[A-Za-z\s]+$/,
                                        message:'Only letters are valid'
                                    },
                                    minLength:{
                                        value:4,
                                        message:'username must be at least 4 or more characters'
                                    }
                                })}
                            />
                            <div className="absolute left-2 bottom-2 text-gray-600">
                                <User/>
                            </div>
                           
                        </div>
                        {errors.username &&( 
                            <p className='  text-red-500'>{errors.username.message}</p>
                        )}
                       
                    </div>
                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input 
                            className=" pl-10 py-2 border-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-600 rounded-md w-full"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('password',{
                                    required:'Password is required',
                                    pattern:{
                                        value: /^[0-9]+$/,
                                        message:'Password must contain only numbers'
                                    },
                                    minLength:{
                                        value:6,
                                        message:'password must be at least 6 numbers'
                                    }
                                })}
                            />
                            <div className="absolute left-2 bottom-3  text-gray-600">
                                <Lock/>
                            </div>
                            <div className="absolute right-2 bottom-3 cursor-pointer text-gray-600"
                            onClick={()=>setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff/> : <Eye/> }
                            </div>
                        </div>
                        
                        {errors.password &&( 
                            <p className='  text-red-500'>{errors.password.message}</p>
                        )}
                    </div>
                    {/* Confirm Password */}
                    <div className="relative">
                        <label htmlFor="button">Confirm Password</label>
                        <div className="relative">
                            <input 
                            className=" pl-10 py-2 border-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-600 rounded-md w-full"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                {...register('confirmPassword',{
                                    required:'Confirm Password is required',
                                    pattern:{
                                        value: /^[0-9]+$/,
                                        message:'Password must contain only numbers'
                                    },
                                    minLength:{
                                        value:6,
                                        message:'passwords are not matched'
                                    },
                                    validate: matchPassword(watch),
                                })}
                            />
                            <div className="absolute left-2 bottom-3  text-gray-600">
                                <Lock/>
                            </div>
                            <div className="absolute right-2 bottom-3 cursor-pointer text-gray-600"
                            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff/> : <Eye/> }
                            </div>
                        </div>
                        
                        {errors.confirmPassword &&( 
                            <p className='  text-red-500'>{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <button 
                    type="submit" 
                    className="text-white text-xl bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-md cursor-pointer w-full">
                        {isLoading ? 'Creating Account...' : 'Create Account '}
                    </button>
                    <p className="text-center text-gray-600 ">Already have an account? <Link to='/signin' className="pl-2 text-orange-600 font-bold" >Sign in</Link> </p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default SignUp;
