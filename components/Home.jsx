import { useContext, useEffect, useState } from 'react'
import TodoStat from './TodoStat'
import TodoCompleted from './TodoCompleted'
import HomeBottomSec from './HomeBottomSec'
import context from '../ContextAPI/ContextInit'

const Home = () => {
    const Context = useContext(context);
    const { ToogleMode, DisplayLight, DisplayDark,SideNavLft,setSideNavLft } = Context;
    const [Todos, setTodos] = useState([]);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todo"))) {
            setTodos(JSON.parse(localStorage.getItem("todo")));
        }
    }, [])
    const toogleLeft = () => {
        if (SideNavLft==="-10rem") {

            setSideNavLft("0rem")
        }
        else{
            setSideNavLft("-10rem")
        }
    }
    return (
        <>
            <div className='flex items-center w-full justify-between pt-8 px-10'>
                <div className="flex items-center space-x-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 border px-2 py-1 rounded-md hidden max-[1025px]:block cursor-pointer ${localStorage.getItem("TodoAppMode")==="dark"?"border-white":"border-black"}`} onClick={toogleLeft}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>

                    <p className='text-3xl font-semibold'>Good Morning</p>
                </div>
                <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#eab308" viewBox="0 0 24 24" strokeWidth={1} stroke="#eab308" className={`size-12 ${DisplayLight ? "block" : "hidden"}`} onClick={ToogleMode}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className={`size-10 ${DisplayDark ? "block" : "hidden"}`} onClick={ToogleMode}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                    </svg>
                </div>

            </div>

            <div className='dashboard mt-16 px-10 flex justify-center w-[86vw] space-x-20 max-[1086px]:space-x-6 max-[1025px]:w-full max-[885px]:flex-col max-[885px]:items-center max-[885px]:space-x-0 max-[885px]:space-y-6'>
                <TodoStat todos={Todos} />
                <TodoCompleted todos={Todos} />
            </div>
            <hr className='mt-20 mb-10 mx-10 border-[#212731] opacity-20 max-[885px]:mt-10 max-[885px]:mb-5' />
            <HomeBottomSec todos={Todos} />
        </>
    )
}

export default Home