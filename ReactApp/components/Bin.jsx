import { useContext, useEffect, useState } from "react"
import SideNav from "./SideNav"
import Todo from "./Todo"
import context from "../ContextAPI/ContextInit";

const Bin = () => {
  const [BinTodos, setBinTodos] = useState([]);
  const Context = useContext(context);
  const { setSideNavLft, SideNavLft } = Context
  useEffect(() => {
    if (localStorage.getItem("bin")) {
      setBinTodos(JSON.parse(localStorage.getItem("bin")))
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
    const newTodos = BinTodos.filter((item) => {
      return item.id !== id;
    })
    setBinTodos(newTodos);
    localStorage.setItem("bin", JSON.stringify(newTodos))
  }
  return (
    <>
      <div className='flex'>
        <div><SideNav /></div>
        <div className='w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-10 border px-2 py-1 rounded-md absolute left-8 top-5 hidden max-[1025px]:block cursor-pointer ${localStorage.getItem("TodoAppMode") === "dark" ? "border-white" : "border-black"}`} onClick={toogleLeft}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          <p className='text-center text-3xl my-20'>Your Todos</p>
          <div className='mx-20'>
            {
              BinTodos.length !== 0 ? BinTodos.map((item, index) => {
                return <Todo key={index} props={{ item, DelTodo, bin: true }} />
              }) : <p>No Todos in Bin.</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Bin