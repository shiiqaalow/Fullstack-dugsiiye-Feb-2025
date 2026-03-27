import {ArrowDown, ArrowUp, Atom, ChartPie, DollarSign, FlaskConical, LayoutDashboard, MessageCircleMore, Power, Search, Settings, ShoppingBag, ShoppingCart, TagIcon, Users} from 'lucide-react';
import React, {useState} from 'react';
import {Links} from 'react-router';

const Dashboard = () => {
    const [ isActive, setIsActive ] =useState(null)
    const sideBars = [
        {name:'Dashboard',icon:<LayoutDashboard color='red'/>},
        {name:'Orders',icon:<ShoppingCart color='red'/>},
        {name:'Products',icon:<ShoppingBag color='red'/>},
        {name:'Overview',icon:<ChartPie color='red'/>},
        {name:'Customers',icon:<Users color='red'/>},
        {name:'Messages',icon:<MessageCircleMore color='red'/>},
        {name:'Settings',icon:<Settings color='red'/>},
    ]
    const activity = [
        {
            title:'Total Sales',
            amount:'$123,456,789',
            icon:<TagIcon size={20} color='green'/>,
            iconStyle:'px-3 py-2 rounded-lg bg-white border-2 border-red-500',
            rating:'+18%',
            ratingStyle:'text-green-500'
        },
        {
            title:'Total Expenses',
            amount:'$123,456,789',
            icon:<FlaskConical size={20} color='white'/>,
            iconStyle:'px-3 py-2 rounded-lg bg-blue-500 border-2 border-red-500',
            rating:'-9%',
            ratingStyle:'text-red-500'
        },
        {
            title:'Total Revenue',
            amount:'$123,456,789',
            icon:<DollarSign size={20} color='white'/>,
            iconStyle:'px-3 py-2 rounded-lg bg-green-500 border-2 border-red-500',
            rating:'+25%',
            ratingStyle:'text-green-500'
        },
    ]
    return (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4 items-start'>
            <div className=" col-span-1 space-y-5  bg-white/20  p-10 rounded-lg">
                <div className='flex items-center gap-3'>
                    <span> <Atom size={35} color='red'/> </span>
                    <h1 className='text-3xl text-gray-900 font-bold text-center'>Dawood Shop2</h1>
                </div>
                <div className='flex flex-col  gap-3 '>
                    {
                        sideBars.map((sideBar,index)=>(
                            <div 
                            className={` flex items-center  gap-3 px-2 py-1  rounded-lg cursor-pointer transition-all   ${isActive === index ? ' bg-white/50' : 'hover:bg-white/20 px-5 ' }`}
                            key={index}
                            onClick={()=>setIsActive(index)}
                            >
                                <span>{sideBar.icon}</span>
                                <h1>{sideBar.name}</h1>
                            </div>
                        ))
                    }
                </div>  
                <div className='flex items-center gap-4'>
                    <span><Power size={20} color='red'/></span>
                    <h1 className='text-3xl text-gray-900 font-bold text-center'>LogOut</h1>
                </div>
            </div>
            <div className="flex flex-col  md:flex-row items-center gap-3 bg-white/20  p-10 rounded-lg md:col-span-2">
                {
                    activity.map((act,index)=>(
                        <div key={index} className='flex flex-col space-y-4 bg-white/40 p-3 w-full rounded-lg'>
                            <div className='flex items-center gap-3'>
                                <span className={act.iconStyle}>{act.icon}</span>
                                <h1>{act.amount}</h1>
                            </div>
                            <div className='flex justify-between items-center'>
                                <h1>{act.title}</h1>
                                <span className={act.ratingStyle}>{act.rating}</span>
                                <span className={act.rating.startsWith('+') ? "text-green-500" : "text-red-500"}>
                                    {act.rating.startsWith('+') ? "▲" : "▼"}
                                </span>
                            </div>
                            
                        </div>
                    ))
                }
    
            </div>
            <div className="col-span-1 bg-white/20  p-10 rounded-lg"></div>
            
        </div>
    );
}

export default Dashboard;
