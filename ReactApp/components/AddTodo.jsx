import { useContext, useEffect, useState } from 'react'
import SideNav from './SideNav'
import Toast from './Toast';
import context from '../ContextAPI/ContextInit';

const AddTodo = () => {
    const [Input, setInput] = useState({ id: "", title: "", deadlineDate: "",deadlineTime:"23:59",deadlineDay:"", desc: "", priority: "",completed:false});
    const days = ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'];
    const [Data, setData] = useState([]);
    const [Display, setDisplay] = useState(false);
    const Context = useContext(context);
    const {FormUI} =  Context;
    useEffect(() => {
        const savedTodos = localStorage.getItem("todo");
        if (savedTodos) {
            setData(JSON.parse(savedTodos));
        }
    }, []);

    const onChange = (e) => {
        setInput({ ...Input, [e.target.name]: e.target.value });
    };

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
        setInput({ id: "", title: "", deadlineDate: "",deadlineTime:"23:59" ,desc: "", priority: "",completed:false})
        localStorage.setItem("todo", JSON.stringify(updatedData));
        setDisplay(true);
    };

    const CloseToast = () => {
        setDisplay(false);
    }
    return (
        <div className='flex'>
            <SideNav />
            <div className="form w-full">
                <p className='text-center text-3xl my-20'>Add a Todo</p>
                <form className='space-y-4 w-fit mx-auto'>
                    <div className='flex w-fit mx-auto space-x-2'>
                        <div className='input flex flex-col'>
                            <label htmlFor="title">Todo Title</label>
                            <input type="text" className=' border focus:outline-none w-[30rem] h-12 rounded-lg px-2 focus:border-2' id='title' name='title' value={Input.title} onChange={onChange} style={{backgroundColor:FormUI.bg,color:FormUI.text,borderColor:FormUI.border}}/>
                        </div>
                        <div className='input flex flex-col'>
                            <label htmlFor="deadline">Todo Deadline</label>
                            <div className='flex'>
                            <input type="date" className='w-40 focus:outline-none border h-12 border-r-0 rounded-l-lg px-4 focus:border-2' id='deadline' name='deadlineDate' value={Input.deadlineDate} onChange={onChange} style={{backgroundColor:FormUI.bg,color:FormUI.text,borderColor:FormUI.border}}/>
                            <input type="time" className='w-[9.5rem] focus:outline-none border h-12 rounded-r-lg border-l-0 px-4 focus:border-2' id='deadline' name='deadlineTime' value={Input.deadlineTime} onChange={onChange} style={{backgroundColor:FormUI.bg,color:FormUI.text,borderColor:FormUI.border}}/>
                            </div>
                        </div>
                        <div className='input flex flex-col'>
                            <label htmlFor="priority">Priority</label>
                            <input type="text" className=' border focus:outline-none w-16 h-12 rounded-lg px-2 focus:border-2' id='priority' name='priority' value={Input.priority} onChange={onChange} autoComplete='off' style={{backgroundColor:FormUI.bg,color:FormUI.text,borderColor:FormUI.border}}/>
                        </div>
                    </div>
                    <div className='input w-fit mx-auto flex flex-col'>
                        <label htmlFor="desc">Todo Description</label>
                        <textarea className='resize-none w-[55rem] h-40 focus:outline-none border  rounded-lg px-2 py-4 focus:border-2' id='desc' name='desc' value={Input.desc} onChange={onChange} style={{backgroundColor:FormUI.bg,color:FormUI.text,borderColor:FormUI.border}}></textarea>
                    </div>
                    <div className="btn flex justify-end"><button className='bg-[#2563EB] disabled:bg-[#3B82F6] mt-10 px-4 py-2 rounded-md text-white hover:bg-[#1D4ED8]' disabled={Input.title===""||Input.deadlineDate===""||Input.desc===""||Input.priority===""||Input.deadlineTime===""} onClick={submitData}>Add Todo</button></div>
                </form>
                <Toast props={{
                    icon:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                    heading:"Added",
                    desc:"Todo was added.",
                    bg:"#D1FAE5",
                    border:"#10B981",
                    text:"#052e16",
                    display:Display,
                    close:CloseToast}}/>
            </div>
        </div>
    )
}

export default AddTodo