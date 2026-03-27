import {Camera, Image, Mail, User} from 'lucide-react';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../context/AuthContext';
import toast from 'react-hot-toast';
import {getUserProfile} from '../lib/auth';
import supabase from '../lib/supabase';

const Profile = () => {
    
    const [ loading,setLoading ] = useState(false)
    const [ username,setUsername ] = useState('')
    const [ avatar,setAvatar ] = useState('')
    const [ avatarUrl,setAvatarUrl ] = useState('')

    const { user } = useAuth()

    useEffect(()=>{
        if(user){
            fetchUserInfo()
        }
    },[user])

    const fetchUserInfo = async () => {
        try {
            setLoading(true)
            const {username,avatar_url} = await getUserProfile(user.id)
            if(username){
                setUsername(username)
            }
            if(avatar_url){
                setAvatarUrl(avatar_url)
            }
            return
        } catch (error) {
            console.error('error getting user profile',error)   
        }finally{
            setLoading(false)
        }
    }

    const handleAvatarChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if(file > 2 * 1024 *  1024){
                toast.error('file size is too large')
                return
            }

            setAvatar(file)

            const previewUrl = URL.createObjectURL(file)

            setAvatarUrl(previewUrl)
        }
    }
    const submitPhoto = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let updates = {username}

            if(avatar){
                // getting file name
                const fileExt = avatar.name.split('.').pop()
                // filtering file name
                const fileName = `${user.id}-${Math.random().toString(36).substring(2)}`
                // getting file path/location
                const filePath = `avatars/${fileName}.${fileExt}`

                const { error:uploadError } = await supabase.storage.from('avatars')
                .upload(filePath,avatar)

                if(uploadError) throw uploadError

                const { data } = supabase.storage.from('avatars')
                .getPublicUrl(filePath)

                updates = {
                    ...updates,
                    avatar_url: data.publicUrl
                }

                setAvatarUrl(data.publicUrl)
            }

                const { error,data } = await supabase
                .from('users')
                .update(updates)
                .eq('id',user.id)
                .select('username,avatar_url')
                .single()

                if(error) throw error

                if(data){
                    setAvatarUrl(data.avatar_url)
                    setUsername(data.username)
                }
                
                toast.success('Your Profile has been updated successfully')
            
        } catch (error) {
            console.error('Error updating your profile',error)
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl mx-auto'>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden  ">

                    {/* profile header */}

                    <div className='bg-gradient-to-r from-orange-500 to-orange-600 w-full p-4'>
                        <div className="flex flex-col items-center">
                            <div className="relative group">

                                {/* profile pic */}

                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                    <img 
                                        src={avatarUrl || 'https://tse2.mm.bing.net/th/id/OIP.M0T2lrei9DX8tcf5uNDeZwHaHa?pid=Api&P=0&h=180'} 
                                        alt="profile-pic"
                                        className='w-full h-full object-cover' 
                                    />
                                    
                                </div>

                                {/* input image uploader */}

                                <label htmlFor="avatar-upload"
                                className='absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-110'
                                >
                                    <Camera className='w-5 h-5 text-orange-600'/>
                                </label>
                                <input 
                                    type="file"
                                    id='avatar-upload'
                                    className='hidden' 
                                    accept='image/*'
                                    onChange={handleAvatarChange}
                                />

                            </div>

                            {/* user info */}

                            <h2 className='mt-4 text-2xl font-bold text-white'>
                                {username || 'Your Profile'}
                            </h2>
                            <p className='text-orange-100'>
                                {user?.email}
                            </p>

                        </div>
                    </div>

                    {/* profile form */}

                    <form onSubmit={submitPhoto} className='p-6 space-y-6'>
                        <div className="space-y-6">

                            {/* username */}

                            <div>
                                <label className='block text-sm font-medium font-gray-700'>
                                    Username
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className='w-5 h-5 text-gray-400'/>
                                    </div>
                                    <input 
                                        type="text"
                                        value={username}
                                        onChange={(e)=>setUsername(e.target.value)}
                                        className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Email Read Only */}

                            <div>
                                <label className='block text-sm font-medium font-gray-700'>
                                    Email
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className='w-5 h-5 text-gray-400'/>
                                    </div>
                                    <input 
                                        type="text"
                                        value={user?.email}
                                        className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
                                        required 
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}

                            <div>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-200"></div>
                                <button 
                                type='submit'
                                disabled={loading}
                                className='inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50'
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Profile;
