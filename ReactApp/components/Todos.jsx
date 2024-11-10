import React, { useEffect, useState } from 'react'
import SideNav from './SideNav'
import Todo from './Todo'
import { useNavigate } from 'react-router-dom'

const Todos = () => {
    const nav = useNavigate();
    const [Todos, setTodos] = useState([]);
    const [Left, setLeft] = useState("left-[0%]")
    const [SelDis, setSelDis] = useState(false);
    const [CompletedTodos, setCompletedTodos] = useState([]);
    const [Priority, setPriority] = useState("h");
    const [HPriorityTodos, setHPriorityTodos] = useState([]);
    const [LPriorityTodos, setLPriorityTodos] = useState([]);
    const [MPriorityTodos, setMPriorityTodos] = useState([]);
    const [BorderA, setBorderA] = useState(true);
    const [BorderB, setBorderB] = useState(false);
    const [BorderC, setBorderC] = useState(false);
    const [BorderD, setBorderD] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todo"))) {
            setTodos(JSON.parse(localStorage.getItem("todo")));
            let arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                return item.completed === true;
            })
            setCompletedTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                if (item.completed === false) {
                    return item.priority.includes("h")
                }
            });
            setHPriorityTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                if (item.completed === false) {
                    return item.priority.includes("m")
                }
            });
            setMPriorityTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                if (item.completed === false) {
                    return item.priority.includes("l")
                }
            });
            setLPriorityTodos(arr);
        }
    }, [])
    const DelTodo = (id) => {
        const arr = [];
        const newTodo = Todos.find((item) => {
            return item.id == id;
        })
        if (newTodo.priority.includes("h")) {
            const arr = HPriorityTodos.filter((item)=>{
                return item.id!==newTodo.id;
            })
            setHPriorityTodos(arr);
        }
        else if (newTodo.priority.includes("m")) {
            const arr = MPriorityTodos.filter((item)=>{
                return item.id!==newTodo.id;
            })
            setMPriorityTodos(arr);
        }
        else{
            const arr = LPriorityTodos.filter((item)=>{
                return item.id!==newTodo.id;
            })
            setLPriorityTodos(arr);
        }
        const newTodos = Todos.filter((item) => {
            return item.id !== id;
        })
        const NcomTodos = CompletedTodos.filter((item)=>{
            return item.id!==id
        })
        setTodos(newTodos);
        setCompletedTodos(NcomTodos);
        localStorage.setItem("todo", JSON.stringify(newTodos));
        arr.push(newTodo);
        localStorage.setItem("bin", JSON.stringify(arr));
    }
    const MarkAsComplete = (id) => {
        const arr = Todos;
        const todo = Todos.find((item)=>{
            return item.id===id;
        })
        const ind = arr.indexOf(todo);
        todo.completed=true
        arr[ind]=todo;
        setTodos(arr);
        setCompletedTodos([...CompletedTodos,todo])
        if (todo.priority.includes("h")) {
            const arr = HPriorityTodos.filter((item)=>{
                return item.id!==id
            })
            setHPriorityTodos(arr);
        }
        else if (todo.priority.includes("m")) {
            const arr = MPriorityTodos.filter((item)=>{
                return item.id!==id
            })
            setMPriorityTodos(arr);
        }
        else {
            const arr = LPriorityTodos.filter((item)=>{
                return item.id!==id
            })
            setLPriorityTodos(arr);
        }
        localStorage.setItem("todo",JSON.stringify(arr));
    }
    return (
        <div className='flex'>
            <div><SideNav /></div>
            <div className='w-full'>
                <p className='text-center text-3xl my-20'>Your Todos</p>
                <div className='nav my-10'>
                    <div className="priorityNav flex w-full justify-between px-40">
                        <div>
                            <button className={`w-56 flex justify-between items-center px-8 rounded-md ${BorderA ? "border-2" : ""} border-black py-2`} onClick={() => { setSelDis(false); setLeft("left-[0%]"); setBorderA(true); setBorderB(false); setBorderC(false); setBorderD(false) }}>
                                <p className='font-medium'>ALL TODOS</p>
                                <p className='border border-black w-6 rounded-full'>{Todos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className={`w-56 flex justify-between items-center px-8 rounded-md ${BorderB ? "border-2" : ""} border-black py-2`} onClick={() => { setSelDis(true); setLeft("left-[-100%]"); setBorderA(false); setBorderB(true); setBorderC(false); setBorderD(false) }}>
                                <p className='font-medium'>PENDING</p>
                                <p className='border border-black w-6 rounded-full'>{HPriorityTodos.length + LPriorityTodos.length + MPriorityTodos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className={`w-56 flex justify-between items-center px-8 rounded-md ${BorderC ? "border-2" : ""} border-black py-2`} onClick={() => { setSelDis(false); setLeft("left-[-200%]"); setBorderA(false); setBorderB(false); setBorderC(true); setBorderD(false) }}>
                                <p className='font-medium'>COMPLETED</p>
                                <p className='border border-black w-6 rounded-full'>{CompletedTodos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className={`w-56 flex justify-between items-center px-8 rounded-md ${BorderD ? "border-2" : ""} border-black py-2`} onClick={() => { setSelDis(false); setLeft("left-[-300%]"); setBorderA(false); setBorderB(false); setBorderC(false); setBorderD(true) }}>
                                <p className='font-medium'>IN BIN</p>
                                <p className='border border-black w-6 rounded-full'>{JSON.parse(localStorage.getItem("bin")).length}</p>
                            </button>
                        </div>
                    </div>
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
                <div className={` w-full h-[62%] z-10 relative ${Left} transition-all`}>
                    <div className=' absolute w-full pl-16 flex flex-wrap left-[0%] h-96 overflow-y-scroll'>
                        {
                            Todos.length !== 0 ? Todos.map((item, index) => {
                                return <div className='mx-3 my-3' key={index}><Todo props={{ item, DelTodo, bin: false, MarkAsComplete }} /></div>
                            }) : <p>No Todos Found.</p>
                        }
                    </div>
                    <div className=' absolute w-full px-28 left-[100%]'>
                        <div className={`${Priority === "h" ? "block" : "hidden"} flex flex-wrap`}>
                            {
                                HPriorityTodos.length !== 0 ? HPriorityTodos.map((item, index) => {
                                    return <div className='mx-3 my-3' key={index} > <Todo props={{ item, DelTodo, bin: false, MarkAsComplete,bg:{color:"#FEE2E2",border:"#EF4444"} }} /></div>
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                        <div className={`${Priority === "m" ? "block" : "hidden"} flex flex-wrap`}>
                            {
                                MPriorityTodos.length !== 0 ? MPriorityTodos.map((item, index) => {
                                    return <div className='mx-3 my-3' key={index} > <Todo props={{ item, DelTodo, bin: false, MarkAsComplete,bg:{color:"#FEF3C7",border:"#F59E0B"} }}/></div>
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                        <div className={`${Priority === "l" ? "block" : "hidden"} flex flex-wrap`}>
                            {
                                LPriorityTodos.length !== 0 ? LPriorityTodos.map((item, index) => {
                                    return <div className='mx-3 my-3' key={index} > <Todo props={{ item, DelTodo, bin: false, MarkAsComplete,bg:{color:"#D1FAE5",border:"#10B981"} }} /></div>
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                    </div>
                    <div className=' absolute w-full px-28 flex flex-wrap left-[200%]'>
                        {
                            CompletedTodos.length !== 0 ? CompletedTodos.map((item, index) => {
                                return <div key={index} className='mx-3 my-3'><Todo props={{ item, DelTodo, bin: false,bg:{color:"#bbf7d0",border:"#14532d"} }} /></div>
                            }) : <p>No Todos Found.</p>
                        }
                    </div>
                    <div className=' absolute w-full px-28 flex space-x-12 flex-wrap left-[300%]'>
                        <div className="btn flex justify-center w-full my-20"><button className='bg-[#2563EB] px-4 py-2 rounded-md text-white hover:bg-[#1D4ED8] flex items-center' onClick={() => { nav("/bin") }}>
                            <p>Go To Bin</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>

                        </button></div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Todos