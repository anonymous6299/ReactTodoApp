import { useEffect, useState } from 'react'
import SideNav from './SideNav'

const AddTodo = () => {
    const [Input, setInput] = useState({ id: "", title: "", deadline: "", desc: "", priority: ""});
    const [Data, setData] = useState([]);
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
        const updatedData = [...Data, Input];
        setData(updatedData);
        localStorage.setItem("todo", JSON.stringify(updatedData));
    };
    return (
        <div className='flex'>
            <SideNav />
            <div className="form w-full">
                <p className='text-center text-3xl my-20'>Add a Todo</p>
                <form className='space-y-4 w-full'>
                    <div className='flex w-fit mx-auto space-x-2'>
                        <div className='input flex flex-col'>
                            <label htmlFor="title">Todo Title</label>
                            <input type="text" className='bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] focus:outline-none w-[30rem] h-12 rounded-lg px-2' id='title' name='title' value={Input.title} onChange={onChange} />
                        </div>
                        <div className='input flex flex-col'>
                            <label htmlFor="deadline">Todo Deadline</label>
                            <input type="date" className='w-80 focus:outline-none border border-[#D1D5DB] h-12 rounded-lg px-4' id='deadline' name='deadline' value={Input.deadline} onChange={onChange} />
                        </div>
                        <div className='input flex flex-col'>
                            <label htmlFor="priority">Priority</label>
                            <input type="text" className='bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] focus:outline-none w-16 h-12 rounded-lg px-2' id='priority' name='priority' value={Input.priority} onChange={onChange} autoComplete='off'/>
                        </div>
                    </div>
                    <div className='input w-fit mx-auto flex flex-col'>
                        <label htmlFor="desc">Todo Description</label>
                        <textarea className='resize-none w-[55rem] h-40 focus:outline-none border border-[#D1D5DB] bg-[#F9FAFB] rounded-lg px-2 py-4' id='desc' name='desc' value={Input.desc} onChange={onChange}></textarea>
                    </div>
                    <div className="btn flex justify-end px-60"><button className='bg-[#3B82F6] px-4 py-2 rounded-md text-white hover:bg-[#2563EB]' onClick={submitData}>Add Todo</button></div>
                </form>
            </div>
        </div>
    )
}

export default AddTodo