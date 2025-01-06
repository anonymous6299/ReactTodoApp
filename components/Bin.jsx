import { useContext, useEffect, useState } from "react"
import SideNav from "./SideNav"
import Todo from "./Todo"
import context from "../ContextAPI/ContextInit";
import Toast from "./Toast";

const Bin = () => {
  const [Display, setDisplay] = useState(false);
  const [BinTodos, setBinTodos] = useState([]);
  const Context = useContext(context);
  const { setSideNavLft, SideNavLft } = Context;
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
  const RestoreTodo = (id) => {
    const bin = JSON.parse(localStorage.getItem("bin"));
    const todo = bin.find((item) => {
      return item.id === id;
    })
    const newBin = bin.filter((item) => {
      return item.id !== id
    })
    setBinTodos(newBin);
    const todos = JSON.parse(localStorage.getItem("todo"));
    const newTodos = [...todos, todo];
    localStorage.setItem("todo", JSON.stringify(newTodos));
    localStorage.setItem("bin", JSON.stringify(newBin));
    setDisplay(true);
  }
  const CloseToast = () => {
    setDisplay(false);
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
          <div className='justify-center flex flex-wrap h-96 overflow-y-scroll '>
            {
              BinTodos.length !== 0 ? BinTodos.map((item, index) => {
                return <div key={index} className="mx-4 my-3"><Todo props={{ item, DelTodo, RestoreTodo, bin: true }} /></div>
              }) : <p>No Todos in Bin.</p>
            }
          </div>
          <Toast props={{
            icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
            heading: "Restored",
            desc: "Todo was restored.",
            bg: "#D1FAE5",
            border: "#10B981",
            text: "#052e16",
            display: Display,
            close: CloseToast
          }} />
        </div>
      </div>
    </>
  )
}

export default Bin