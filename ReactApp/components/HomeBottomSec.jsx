import  { useEffect, useState } from 'react'
import Todo from './Todo'
const HomeBottomSec = (props) => {
    const [Arr, setArr] = useState([]);
    useEffect(() => {
        const todos = props.todos;
        const arr = todos.reverse();
        setArr(arr.slice(0,4));
    }, [props.todos])
    
    return (
        <div className="pr-10">
            <div className='flex w-full justify-between'>
                <p className='text-2xl font-medium mx-10'>Recently Added</p>
                <div className="search flex">
                    <input type="text" placeholder='Search' className='bg-transparent border border-[#212731] w-[18rem] h-9 rounded-l-md px-6 focus:outline-none focus:border-2 border-r-0' name='todo'/>
                    <button className='border border-[#212731] rounded-r-md px-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 opacity-70 hover:opacity-100">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>

            </div>
            <div className='w-full flex justify-between mx-4 my-16'>
                {
                    Arr.map((item,index)=>{
                        return <Todo key={index} props={{ item, bin: false }} />
                    })
                }
            </div>
        </div>
    )
}

export default HomeBottomSec