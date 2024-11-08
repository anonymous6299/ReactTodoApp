import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Todo from './Todo'
import { useNavigate } from 'react-router-dom'

const Todos = () => {
    const nav = useNavigate();
    const [Todos, setTodos] = useState([]);
    const [BinTodos, setBinTodos] = useState([]);
    const [MLeft, setMLeft] = useState("ml-[10rem]");
    const [Left, setLeft] = useState("left-[0%]")
    const [SelDis, setSelDis] = useState(false);
    const [CompletedTodos, setCompletedTodos] = useState([]);
    const [PendingTodos, setPendingTodos] = useState([]);
    const [Priority, setPriority] = useState("h")
    const [HPriorityTodos, setHPriorityTodos] = useState([])
    const [LPriorityTodos, setLPriorityTodos] = useState([])
    const [MPriorityTodos, setMPriorityTodos] = useState([])

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todo"))) {
            setTodos(JSON.parse(localStorage.getItem("todo")));
            let arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                return item.completed === true;
            })
            setCompletedTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                return item.completed === false;
            })
            setPendingTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                return item.priority.includes("h");
            });
            setHPriorityTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                return item.priority.includes("m");
            });
            setMPriorityTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                return item.priority.includes("l");
            });
            setLPriorityTodos(arr);
        }
        if (JSON.parse(localStorage.getItem("bin"))) {
            setBinTodos(JSON.parse(localStorage.getItem("bin")));
        }
    }, [])
    const DelTodo = (id) => {
        const arr = [];
        const newTodo = Todos.find((item) => {
            return item.id == id;
        })
        const newTodos = Todos.filter((item) => {
            return item.id !== id;
        })
        setTodos(newTodos);
        localStorage.setItem("todo", JSON.stringify(newTodos))
        arr.push(newTodo);
        localStorage.setItem("bin", JSON.stringify(arr))
    }
    return (
        <div className='flex'>
            <div><SideNav /></div>
            <div className='w-full'>
                <p className='text-center text-3xl my-20'>Your Todos</p>
                <div className='nav my-10'>
                    <div className="priorityNav flex w-full justify-between px-40">
                        <div>
                            <button className='w-56 flex justify-between items-center px-8' onClick={() => { setMLeft("ml-[10rem]"); setSelDis(false); setLeft("left-[0%]") }}>
                                <p className='font-medium'>ALL TODOS</p>
                                <p className='border border-black w-6 rounded-full'>{Todos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className='w-56 flex justify-between items-center px-8' onClick={() => { setMLeft("ml-[26.6rem]"); setSelDis(true); setLeft("left-[-100%]") }}>
                                <p className='font-medium'>PENDING</p>
                                <p className='border border-black w-6 rounded-full'>{PendingTodos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className='w-56 flex justify-between items-center px-8' onClick={() => { setMLeft("ml-[43.4rem]"); setSelDis(false); setLeft("left-[-200%]") }}>
                                <p className='font-medium'>COMPLETED</p>
                                <p className='border border-black w-6 rounded-full'>{CompletedTodos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className='w-56 flex justify-between items-center px-8' onClick={() => { setMLeft("ml-[60rem]"); setSelDis(false); setLeft("left-[-300%]") }}>
                                <p className='font-medium'>IN BIN</p>
                                <p className='border border-black w-6 rounded-full'>{BinTodos.length}</p>
                            </button>
                        </div>
                    </div>
                    <div className={`border border-black w-56 my-3 transition-all ${MLeft}`}></div>
                    <div className={`select flex justify-end mx-52 ${SelDis ? "block" : "hidden"}`}>
                        <div className='flex flex-col'>
                            <label htmlFor="priority" className='mx-1 my-1'>Priority:</label>
                            <select name="priority" id="priority" className='bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] w-28 h-9 rounded-lg px-3' value={Priority} onChange={(e) => { setPriority(e.target.value) }}>
                                <option value="h">High</option>
                                <option value="m">Medium</option>
                                <option value="l">Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={` w-full h-[64%] z-10 relative ${Left} transition-all`}>
                    <div className=' absolute w-full px-28 flex space-x-12 flex-wrap left-[0%]'>
                        {
                            Todos.length !== 0 ? Todos.map((item, index) => {
                                return <Todo key={index} props={{ item, DelTodo, bin: false }} />
                            }) : <p>No Todos Found.</p>
                        }
                    </div>
                    <div className=' absolute w-full px-28 flex space-x-12 flex-wrap left-[100%]'>
                        <div className={Priority==="h"?"block":"hidden"}>
                            {
                                HPriorityTodos.length !== 0 ? Todos.map((item, index) => {
                                    return <Todo key={index} props={{ item, DelTodo, bin: false }} />
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                        <div className={Priority==="m"?"block":"hidden"}>
                            {
                                MPriorityTodos.length !== 0 ? Todos.map((item, index) => {
                                    return <Todo key={index} props={{ item, DelTodo, bin: false }} />
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                        <div className={Priority==="l"?"block":"hidden"}>
                            {
                                LPriorityTodos.length !== 0 ? Todos.map((item, index) => {
                                    return <Todo key={index} props={{ item, DelTodo, bin: false }} />
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                    </div>
                    <div className=' absolute w-full px-28 flex space-x-12 flex-wrap left-[200%]'>
                        {
                            CompletedTodos.length !== 0 ? Todos.map((item, index) => {
                                return <Todo key={index} props={{ item, DelTodo, bin: false }} />
                            }) : <p>No Todos Found.</p>
                        }
                    </div>
                    <div className=' absolute w-full px-28 flex space-x-12 flex-wrap left-[300%]'>
                    <div className="btn flex justify-center w-full my-20"><button className='bg-[#2563EB] px-4 py-2 rounded-md text-white hover:bg-[#1D4ED8]' onClick={()=>{nav("/bin")}}>Go To Bin</button></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Todos