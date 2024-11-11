import Toast from './Toast';
import { useEffect, useState } from 'react';
import SideNav from '../components/SideNav'
import { useParams } from 'react-router-dom';

const UpdTodo = () => {
  const { id } = useParams();
  const [Todo, setTodo] = useState({ id: "", title: "", deadlineDay: "", desc: "", deadlineDate: "", deadlineTime: "", priority: "", completed: false });
  const [Index, setIndex] = useState(0);
  const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
  const [Display, setDisplay] = useState(false);
  const onChange = (e) => {
    setTodo({ ...Todo, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (localStorage.getItem("todo")) {
      const todos = JSON.parse(localStorage.getItem("todo"));
      const todo = todos.find((item) => {
        return item.id == id;
      })
      const date = new Date(todo.deadlineDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = new Date().getFullYear();
      todo.deadlineDate = `${year}-${month}-${day}`
      setTodo(todo);
      setIndex(todos.indexOf(todo));
    }
  }, [])
  const submitData = (e) => {
    e.preventDefault();
    const deadlineDate = new Date(Todo.deadlineDate);
    Todo.deadlineDate = deadlineDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    Todo.deadlineDay = days[deadlineDate.getDay()];
    const todos = JSON.parse(localStorage.getItem("todo"));
    todos[Index] = Todo;
    localStorage.setItem("todo", JSON.stringify(todos));
    setDisplay(true);
  }
  const CloseToast = () => {
    setDisplay(false);
  }
  return (
    <div className='flex'>
      <SideNav />
      <div className="form w-full">
        <p className='text-center text-3xl my-20'>Update Todo</p>
        <form className='space-y-4 w-full'>
          <div className='flex w-fit mx-auto space-x-2'>
            <div className='input flex flex-col'>
              <label htmlFor="title">Todo Title</label>
              <input type="text" className='bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] focus:outline-none w-[29rem]  h-12 rounded-lg px-2' id='title' name='title' value={Todo.title} onChange={onChange} />
            </div>
            <div className='input flex flex-col'>
              <label htmlFor="deadline">Todo Deadline</label>
              <div className="flex">
                <input type="date" className='w-48 focus:outline-none border border-[#D1D5DB] border-r-0 h-12 rounded-l-lg px-4' id='deadline' name='deadlineDate' value={Todo.deadlineDate} onChange={onChange} />
                <input type="time" className='w-40 focus:outline-none border border-[#D1D5DB] border-l-0 h-12 rounded-r-lg px-4' id='deadline' name='deadlineTime' value={Todo.deadlineTime} onChange={onChange} />
              </div>
            </div>
            <div className='input flex flex-col'>
              <label htmlFor="deadline">Priority</label>
              <input type="text" className='w-12 focus:outline-none border border-[#D1D5DB] h-12 rounded-lg px-4' id='deadline' name='priority' value={Todo.priority} onChange={onChange} />
            </div>
          </div>
          <div className='input w-fit mx-auto flex flex-col'>
            <label htmlFor="desc">Todo Description</label>
            <textarea className='resize-none w-[55rem] h-40 focus:outline-none border border-[#D1D5DB] rounded-lg px-2 py-4' id='desc' name='desc' value={Todo.desc} onChange={onChange}></textarea>
          </div>
          <div className="btn flex justify-end px-60"><button className='bg-[#2563EB] disabled:bg-[#3B82F6] px-4 py-2 rounded-md text-white hover:bg-[#1D4ED8]' onClick={submitData}>Update</button></div>
        </form>
      </div>
      <Toast props={{
        icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        heading: "Updated",
        desc: "Todo was updated.",
        bg: "#D1FAE5",
        border: "#10B981",
        text: "#052e16",
        display: Display,
        close: CloseToast
      }} />
    </div>
  )
}

export default UpdTodo