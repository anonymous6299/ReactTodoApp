import { useContext, useEffect, useState } from 'react'
import SideNav from './SideNav'
import Toast from './Toast';
import context from '../ContextAPI/ContextInit';

const AddTodo = () => {
    const [Input, setInput] = useState({ id: "", title: "", deadlineDate: "", deadlineTime: "23:59", deadlineDay: "", desc: "", priority: "", completed: false });
    const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    const [Data, setData] = useState([]);
    const [Display, setDisplay] = useState(false);
    const Context = useContext(context);
    const { FormUI, setSideNavLft, SideNavLft } = Context;
    const [HoverCard, setHoverCard] = useState(0);
    useEffect(() => {
        const savedTodos = localStorage.getItem("todo");
        if (savedTodos) {
            setData(JSON.parse(savedTodos));
        }
    }, []);

    const onChange = (e) => {
        setInput({ ...Input, [e.target.name]: e.target.value });
    };

    const toogleLeft = () => {
        if (SideNavLft === "-10rem") {

            setSideNavLft("0rem")
        }
        else {
            setSideNavLft("-10rem")
        }
    }
    const submitData = (e) => {
        e.preventDefault();
        Input.id = Data.length + 1;
        const deadlineDate = new Date(Input.deadlineDate);
        Input.deadlineDate = deadlineDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
        });
        Input.deadlineDay = days[deadlineDate.getDay()];
        const updatedData = [...Data, Input];
        setData(updatedData);
        setInput({ id: "", title: "", deadlineDate: "", deadlineTime: "23:59", desc: "", priority: "", completed: false })
        localStorage.setItem("todo", JSON.stringify(updatedData));
        setDisplay(true);
    };

    const CloseToast = () => {
        setDisplay(false);
    }
    return (
        <div className='flex'>
            <SideNav />
            <div className="form w-full h-[100vh] overflow-y-scroll">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 border px-2 py-1 rounded-md absolute left-8 top-5 hidden max-[1025px]:block cursor-pointer ${localStorage.getItem("TodoAppMode") === "dark" ? "border-white" : "border-black"}`} onClick={toogleLeft}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <p className='text-center text-3xl my-20'>Add a Todo</p>
                <form className='space-y-4 w-fit mx-auto '>
                    <div className='flex w-fit mx-auto space-x-2 max-[595px]:flex-col max-[595px]:space-x-0 max-[595px]:space-y-3 max-[595px]:w-full'>
                        <div className='input flex flex-col'>
                            <label htmlFor="title">Todo Title</label>
                            <input type="text" className=' border focus:outline-none w-[30rem] max-[1070px]:w-[20rem] max-[775px]:w-[10rem] h-12 rounded-lg px-2 focus:border-2 max-[595px]:w-96 max-[400px]:w-72' id='title' name='title' value={Input.title} onChange={onChange} style={{ backgroundColor: FormUI.bg, color: FormUI.text, borderColor: FormUI.border }} />
                        </div>
                        <div className='input flex flex-col'>
                            <label htmlFor="deadline">Todo Deadline</label>
                            <div className='flex max-[400px]:flex-col max-[400px]:space-y-2'>
                                <input type="date" className='w-40 focus:outline-none border h-12 min-[400px]:border-r-0 rounded-l-lg max-[400px]:rounded-r-lg px-4 focus:border-2 max-[595px]:w-[50%] max-[400px]:w-full ' id='deadline' name='deadlineDate' value={Input.deadlineDate} onChange={onChange} style={{ backgroundColor: FormUI.bg, color: FormUI.text, borderColor: FormUI.border }} />
                                <input type="time" className='w-[9.5rem] focus:outline-none border h-12 rounded-r-lg max-[400px]:rounded-l-lg min-[400px]:border-l-0 px-4 focus:border-2 max-[595px]:w-[50%] max-[400px]:w-full ' id='deadline' name='deadlineTime' value={Input.deadlineTime} onChange={onChange} style={{ backgroundColor: FormUI.bg, color: FormUI.text, borderColor: FormUI.border }} />
                            </div>
                        </div>
                        <div className={`absolute right-48 top-28 border px-4 py-2 rounded-md text-sm ${localStorage.getItem("TodoAppMode")==="light"?"border-black":"border-white"}`} style={{ opacity: HoverCard, transition: "opacity 0.5s" }}>
                            <div className="flex justify-between items-center space-x-5">
                                <div className="priorities">
                                    <p className='font-medium'>h</p>
                                    <p className='font-medium'>m</p>
                                    <p className='font-medium'>l</p>
                                </div>
                                <div className="colon">
                                    <p className='font-medium'>:</p>
                                    <p className='font-medium'>:</p>
                                    <p className='font-medium'>:</p>
                                </div>
                                <div className="Priority">
                                    <p>High Priority</p>
                                    <p>Medium Priority</p>
                                    <p>Low Priority</p>
                                </div>
                            </div>
                        </div>
                        <div className='input flex flex-col' onMouseEnter={() => { setHoverCard(100) }} onMouseLeave={() => { setHoverCard(0) }}>
                            <label htmlFor="priority">Priority</label>
                            <input type="text" className=' border focus:outline-none w-16 h-12 rounded-lg px-2 focus:border-2 max-[595px]:w-96 max-[400px]:w-72' id='priority' name='priority' value={Input.priority} onChange={onChange} autoComplete='off' style={{ backgroundColor: FormUI.bg, color: FormUI.text, borderColor: FormUI.border }} />
                        </div>
                    </div>
                    <div className='input w-fit mx-auto flex flex-col'>
                        <label htmlFor="desc">Todo Description</label>
                        <textarea className='resize-none w-[55rem] h-40 focus:outline-none border  rounded-lg px-2 py-4 focus:border-2 max-[1070px]:w-[45rem] max-[775px]:w-[35rem] max-[595px]:w-96 max-[400px]:w-72' id='desc' name='desc' value={Input.desc} onChange={onChange} style={{ backgroundColor: FormUI.bg, color: FormUI.text, borderColor: FormUI.border }}></textarea>
                    </div>
                    <div className="btn flex justify-end"><button className='bg-[#2563EB] disabled:bg-[#3B82F6] my-10 px-4 py-2 rounded-md text-white hover:bg-[#1D4ED8]' disabled={Input.title === "" || Input.deadlineDate === "" || Input.desc === "" || Input.priority === "" || Input.deadlineTime === ""} onClick={submitData}>Add Todo</button></div>
                </form>
                <Toast props={{
                    icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                    heading: "Added",
                    desc: "Todo was added.",
                    bg: "#D1FAE5",
                    border: "#10B981",
                    text: "#052e16",
                    display: Display,
                    close: CloseToast
                }} />
            </div>
        </div>
    )
}

export default AddTodo