import { useContext, useEffect, useState } from 'react'
import SideNav from './SideNav'
import Todo from './Todo'
import { useNavigate } from 'react-router-dom'
import Toast from './Toast'
import context from '../ContextAPI/ContextInit'
const Todos = () => {
    const Context = useContext(context);
    const { TodoNavBdr, setSideNavLft, SideNavLft } = Context;
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
    const [Display, setDisplay] = useState(false);
    const [Heading, setHeading] = useState("");
    const [Desc, setDesc] = useState("")
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("todo"))) {
            setTodos(JSON.parse(localStorage.getItem("todo")));
            let arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                return item.completed === true;
            })
            setCompletedTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                if (item.completed === false) {
                    return item.priority==="h"
                }
            });
            setHPriorityTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                if (item.completed === false) {
                    return item.priority==="m"
                }
            });
            setMPriorityTodos(arr);
            arr = JSON.parse(localStorage.getItem("todo")).filter((item) => {
                if (item.completed === false) {
                    return item.priority==="l"
                }
            });
            setLPriorityTodos(arr);
        }
    }, [])
    const toogleLeft = () => {
        if (SideNavLft === "-10rem") {

            setSideNavLft("0rem")
        }
        else {
            setSideNavLft("-10rem")
        }
    }
    const DelTodo = (id) => {
        let bin = JSON.parse(localStorage.getItem("bin"));
        const newTodo = Todos.find((item) => {
            return item.id == id;
        })
        if (newTodo.priority==="h") {
            const arr = HPriorityTodos.filter((item) => {
                return item.id !== newTodo.id;
            })
            setHPriorityTodos(arr);
        }
        else if (newTodo.priority==="m") {
            const arr = MPriorityTodos.filter((item) => {
                return item.id !== newTodo.id;
            })
            setMPriorityTodos(arr);
        }
        else {
            const arr = LPriorityTodos.filter((item) => {
                return item.id !== newTodo.id;
            })
            setLPriorityTodos(arr);
        }
        const newTodos = Todos.filter((item) => {
            return item.id !== id;
        })
        const NcomTodos = CompletedTodos.filter((item) => {
            return item.id !== id
        })
        
        setTodos(newTodos);
        setCompletedTodos(NcomTodos);
        bin=[...bin,newTodo];
        localStorage.setItem("todo", JSON.stringify(newTodos));
        localStorage.setItem("bin", JSON.stringify(bin));
        setHeading("Todo Deleted");
        setDesc("Todo moved to Bin.");
        setDisplay(true);
    }
    const MarkAsComplete = (id) => {
        const arr = Todos;
        const todo = Todos.find((item) => {
            return item.id === id;
        })
        const ind = arr.indexOf(todo);
        todo.completed = true
        arr[ind] = todo;
        setTodos(arr);
        setCompletedTodos([...CompletedTodos, todo])
        if (todo.priority==="h") {
            const arr = HPriorityTodos.filter((item) => {
                return item.id !== id
            })
            setHPriorityTodos(arr);
        }
        else if (todo.priority==="m") {
            const arr = MPriorityTodos.filter((item) => {
                return item.id !== id
            })
            setMPriorityTodos(arr);
        }
        else {
            const arr = LPriorityTodos.filter((item) => {
                return item.id !== id
            })
            setLPriorityTodos(arr);
        }
        localStorage.setItem("todo", JSON.stringify(arr));
        setHeading("Completed");
        setDesc("Todo marked as completed.");
        setDisplay(true);
    }
    const CloseToast = () => {
        setDisplay(false);
    }
    return (
        <div className='flex overflow-y-hidden overflow-x-hidden max-[1025px]:h-[100vh]'>
            <div><SideNav /></div>
            <div className='w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 border px-2 py-1 rounded-md absolute left-8 top-5 hidden max-[1025px]:block cursor-pointer ${localStorage.getItem("TodoAppMode") === "dark" ? "border-white" : "border-black"}`} onClick={toogleLeft}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <p className='text-center text-3xl my-20 max-[865px]:my-10'>Your Todos</p>
                <div className='nav my-10 max-[865px]:mt-0'>
                    <div className="priorityNav flex w-full justify-between px-40 max-[1350px]:px-20 max-[1178px]:px-10 max-[1025px]:px-5 max-[865px]:flex-col max-[865px]:items-center max-[865px]:space-y-4">
                        <div>
                            <button className={`w-56 max-[1088px]:w-52 max-[1053px]:w-48 flex justify-between items-center px-8 rounded-md ${BorderA ? "border-2" : ""} py-2`} onClick={() => { setSelDis(false); setLeft("left-[0%]"); setBorderA(true); setBorderB(false); setBorderC(false); setBorderD(false) }} style={{ borderColor: TodoNavBdr }}>
                                <p className='font-medium'>ALL TODOS</p>
                                <p className='border w-6 rounded-full' style={{ borderColor: TodoNavBdr }}>{Todos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className={`w-56 max-[1088px]:w-52 max-[1053px]:w-48 flex justify-between items-center px-8 rounded-md ${BorderB ? "border-2" : ""} py-2`} onClick={() => { setSelDis(true); setLeft("left-[-100%]"); setBorderA(false); setBorderB(true); setBorderC(false); setBorderD(false) }} style={{ borderColor: TodoNavBdr }}>
                                <p className='font-medium'>PENDING</p>
                                <p className='border w-6 rounded-full' style={{ borderColor: TodoNavBdr }}>{HPriorityTodos.length + LPriorityTodos.length + MPriorityTodos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className={`w-56 max-[1088px]:w-52 max-[1053px]:w-48 flex justify-between items-center px-8 rounded-md ${BorderC ? "border-2" : ""} py-2`} onClick={() => { setSelDis(false); setLeft("left-[-200%]"); setBorderA(false); setBorderB(false); setBorderC(true); setBorderD(false) }} style={{ borderColor: TodoNavBdr }}>
                                <p className='font-medium'>COMPLETED</p>
                                <p className='border w-6 rounded-full' style={{ borderColor: TodoNavBdr }}>{CompletedTodos.length}</p>
                            </button>
                        </div>
                        <div>
                            <button className={`w-56 max-[1088px]:w-52 max-[1053px]:w-48 flex justify-between items-center px-8 rounded-md ${BorderD ? "border-2" : ""} py-2`} onClick={() => { setSelDis(false); setLeft("left-[-300%]"); setBorderA(false); setBorderB(false); setBorderC(false); setBorderD(true) }} style={{ borderColor: TodoNavBdr }}>
                                <p className='font-medium'>IN BIN</p>
                                <p className='border w-6 rounded-full' style={{ borderColor: TodoNavBdr }}>{JSON.parse(localStorage.getItem("bin")).length}</p>
                            </button>
                        </div>
                    </div>
                    <div className={`select absolute flex justify-end right-28 ${SelDis ? "block" : "hidden"}`}>
                        <div className='flex items-center'>
                            <label htmlFor="priority" className='mx-1 my-1'>Priority:</label>
                            <select name="priority" id="priority" className='bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] w-28 h-9 rounded-lg px-3' value={Priority} onChange={(e) => { setPriority(e.target.value) }}>
                                <option value="h">High</option>
                                <option value="m">Medium</option>
                                <option value="l">Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={` w-full h-[62%] z-10 relative ${Left} transition-all max-[865px]:pt-10`}>
                    <div className={`absolute w-full px-12 max-[1053px]:px-10 justify-center flex flex-wrap left-[0%] h-80 max-[768px]:h-52 max-[768px]:px-2 ${Todos.length !== 0 ? "overflow-y-scroll" : ""}`}>
                        {
                            Todos.length !== 0 ? Todos.map((item, index) => {
                                return <div className='mx-3 my-3' key={index}><Todo props={{ item, DelTodo, bin: false, MarkAsComplete }} /></div>
                            }) : <p>No Todos Found.</p>
                        }
                    </div>
                    <div className=' absolute w-full left-[100%] h-80 max-[768px]:h-52'>
                        <div className={`${Priority === "h" ? "block" : "hidden"} absolute w-full justify-center flex flex-wrap h-full px-12 max-[1053px]:px-10 max-[768px]:px-2 ${HPriorityTodos.length !== 0 ? "overflow-y-scroll" : ""}`}>
                            {
                                HPriorityTodos.length !== 0 ? HPriorityTodos.map((item, index) => {
                                    return <div className='mx-3 my-3' key={index} > <Todo props={{ item, DelTodo, bin: false, MarkAsComplete, bg: { color: "#FEE2E2", border: "#EF4444" } }} /></div>
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                        <div className={`${Priority === "m" ? "block" : "hidden"} absolute w-full justify-center flex flex-wrap h-full px-28 max-[1053px]:px-10 max-[768px]:px-2 ${MPriorityTodos.length !== 0 ? "overflow-y-scroll" : ""}`}>
                            {
                                MPriorityTodos.length !== 0 ? MPriorityTodos.map((item, index) => {
                                    return <div className='mx-3 my-3' key={index} > <Todo props={{ item, DelTodo, bin: false, MarkAsComplete, bg: { color: "#FEF3C7", border: "#F59E0B" } }} /></div>
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                        <div className={`${Priority === "l" ? "block" : "hidden"} absolute w-full justify-center flex flex-wrap h-full px-28 max-[1053px]:px-10 max-[768px]:px-2 ${LPriorityTodos.length !== 0 ? "overflow-y-scroll" : ""}`}>
                            {
                                LPriorityTodos.length !== 0 ? LPriorityTodos.map((item, index) => {
                                    return <div className='mx-3 my-3' key={index} > <Todo props={{ item, DelTodo, bin: false, MarkAsComplete, bg: { color: "#D1FAE5", border: "#10B981" } }} /></div>
                                }) : <p>No Todos Found.</p>
                            }
                        </div>
                    </div>
                    <div className={`absolute w-full px-28 max-[1053px]:px-10 justify-center flex flex-wrap left-[200%] h-96 max-[768px]:h-52 max-[768px]:px-2 ${CompletedTodos.length !== 0 ? "overflow-y-scroll" : ""}`}>
                        {
                            CompletedTodos.length !== 0 ? CompletedTodos.map((item, index) => {
                                return <div key={index} className='mx-3 my-3'><Todo props={{ item, DelTodo, bin: false, bg: { color: "#bbf7d0", border: "#14532d" } }} /></div>
                            }) : <p>No Todos Found.</p>
                        }
                    </div>
                    <div className=' absolute w-full left-[300%]'>
                        <div className="btn flex justify-center w-full my-20"><button className='bg-[#2563EB] px-4 py-2 rounded-md text-white hover:bg-[#1D4ED8] flex items-center' onClick={() => { nav("/bin") }}>
                            <p>Go To Bin</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                            </svg>

                        </button></div>
                    </div>

                </div>
                <Toast props={{
                    icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                    heading: Heading,
                    desc: Desc,
                    bg: localStorage.getItem("TodoAppMode")==="light"?"#D1FAE5":"#10B981",
                    border:"#10B981",
                    text: localStorage.getItem("TodoAppMode")==="light"?"#052e16":"#F8FAFC",
                    display: Display,
                    close: CloseToast
                }} />
            </div>
        </div>
    )
}

export default Todos