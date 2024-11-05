
import { useEffect, useState } from 'react';
import SideNav from '../components/SideNav'
import { useParams } from 'react-router-dom';

const UpdTodo = () => {
  const { id } = useParams();
  const [Todo, setTodo] = useState({id:"", title: "", deadline: "", desc: "" });
  const [Index, setIndex] = useState(0);
  const onChange = (e) => {
    setTodo({ ...Todo, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    if (localStorage.getItem("todo")) {
      const todos = JSON.parse(localStorage.getItem("todo"));
      const todo = todos.find((item) => {
        return item.id == id;
      })
      setTodo(todo);
      setIndex(todos.indexOf(todo));
    }
  }, [])
  const submitData = (e) => {
    e.preventDefault();
    const todos = JSON.parse(localStorage.getItem("todo"));
    todos[Index] = Todo;
    localStorage.setItem("todo", JSON.stringify(todos));
  }
  return (
    <div className='flex'>
      <SideNav />
      <div className="form w-full">
        <p className='text-center text-3xl my-20'>Add a Todo</p>
        <form className='space-y-4 w-full'>
          <div className='flex w-fit mx-auto space-x-4'>
            <div className='input flex flex-col'>
              <label htmlFor="title">Todo Title</label>
              <input type="text" className='bg-[#F9FAFB] border border-[#D1D5DB] text-[#1F2937] focus:outline-none w-[30rem]  h-12 rounded-lg px-2' id='title' name='title' value={Todo.title} onChange={onChange} />
            </div>
            <div className='input flex flex-col'>
              <label htmlFor="deadline">Todo Deadline</label>
              <input type="date" className='w-96 focus:outline-none border border-[#D1D5DB] h-12 rounded-lg px-4' id='deadline' name='deadline' value={Todo.deadline} onChange={onChange} />
            </div>
          </div>
          <div className='input w-fit mx-auto flex flex-col'>
            <label htmlFor="desc">Todo Description</label>
            <textarea className='resize-none w-[55rem] h-40 focus:outline-none border border-[#D1D5DB] rounded-lg px-2 py-4' id='desc' name='desc' value={Todo.desc} onChange={onChange}></textarea>
          </div>
          <div className="btn flex justify-end px-60"><button className='bg-[#3B82F6] px-4 py-2 rounded-md text-white hover:bg-[#2563EB]' onClick={submitData}>Update</button></div>
        </form>
      </div>
    </div>
  )
}

export default UpdTodo