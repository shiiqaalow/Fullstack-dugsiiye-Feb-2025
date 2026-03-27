import React, {useState} from "react";
import {Check, Eye, Lock, Mail, X, User, EyeOff} from "lucide-react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import {signIn} from "../lib/auth";
import {useAuth} from "../context/AuthContext";

const SignIn = () => {

    const {  register, handleSubmit, watch, formState: { errors } } = useForm()

    const [ isLoading,setIsLoading ] =useState(false)
    const [ showPassword,setShowPassword ] =useState(false)
    const [ status,setStatus ] =useState(null)

    const authInfo = useAuth()

    console.log({authInfo})

    const navigate = useNavigate()

    const onSubmit = async (data) => {

        try{
            await signIn(data.email,data.password)
            // first display status message
            setStatus('success')
        
            setTimeout(() => {
                // loading animation duration
                setIsLoading(true)

                setTimeout(() => {
                    navigate("/")
                }, 1300)   

            }, 1000)   


        }catch{
            // first display status message
            setStatus('error')
            // set loading off (no need)
            setIsLoading(false)
        }

    };

 
  return (
    <div className="relative min-h-screen flex justify-center items-center bg-gray-50">
        {status ==='success' && (
            <div className="absolute right-2 top-10 sm:right-50 bg-green-200 px-4 py-2 flex items-center gap-2 rounded-lg">
                    <div className="bg-green-400 w-6 h-6 flex justify-center items-center rounded-full">
                        <Check size={18} color="white"/>
                    </div>
                    <div className="">
                        <p className="text-green-500 font-bold text-md">You have successfully signed in</p>
                    </div>
                     <div 
                    className="absolute -left-1 -top-1 bg-red-700 rounded-full cursor-pointer"
                    onClick={()=>setStatus(false)}
                    >
                        <X size={18} color="white"/>
                    </div>
            </div>
        )}
        {status ==='error' && (
            <div className="absolute right-2 top-10 sm:right-50 bg-red-200 px-4 py-2 flex items-center gap-2 rounded-lg">
                    <div className="bg-red-400 w-6 h-6 flex justify-center items-center rounded-full">
                        <X color="white"/>
                    </div>
                    <div className="">
                        <p className="text-red-500 font-bold text-md">Sorry invalid Login credentials!</p>
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
                        <h1 className="text-3xl text-gray-900 font-bold">Welcome Back</h1>
                        <p className="text-gray-600 mt-3">Sign in to access your account</p>
            </div>
            <div className=" bg-white shadow-lg p-8  rounded-md mt-5 ">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {isLoading && (
                                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
                                    <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center justify-center animate-fadeIn">
                                    <div className="w-14 h-14 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                                    <p className="mt-5 text-orange-600 text-xl font-semibold">
                                        Signing in...
                                    </p>
                                    </div>
                                </div>
                            )}
        
                            {/* email */}
                            <div className="">
                                <label htmlFor="username">Email Address</label>
                                <div className="relative group">
                                    <input 
                                    className=" pl-10 py-2 border-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-600 rounded-md w-full "
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
                                    <div className="absolute left-2 bottom-2 text-gray-600 group-focus-within:text-orange-600 transition-colors">
                                        <Mail/>
                                    </div>
                                </div>
        
                                {errors.email &&( 
                                    <p className='  text-red-500'>{errors.email.message}</p>
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
                                        <Lock />
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
                            {/* <div className="relative">
                                <label htmlFor="button">Confirm Password</label>
                                <div className="relative">
                                    <input 
                                    className=" pl-10 py-2 border-2 focus:outline-none focus:border-none focus:ring-2 focus:ring-orange-600 rounded-md w-full"
                                        type="password"
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
                                    <div className="absolute right-2 bottom-3 cursor-pointer text-gray-600">
                                        <Eye/>
                                    </div>
                                </div>
                                
                                {errors.confirmPassword &&( 
                                    <p className='  text-red-500'>{errors.confirmPassword.message}</p>
                                )}
                            </div> */}
                            <button 
                            type="submit" 
                            className="text-white text-xl bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded-md cursor-pointer w-full">
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                            <p className="text-center text-gray-600 ">Don't have an account? <Link to='/signup' className="pl-2 text-orange-600 font-bold" >Sign up</Link> </p>
                        </form>
            </div>
        </div>
    </div>
      
  );
};

export default SignIn;
