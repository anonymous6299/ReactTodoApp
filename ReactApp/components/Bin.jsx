import { useEffect, useState } from "react"
import SideNav from "./SideNav"
import Todo from "./Todo"

const Bin = () => {
  const [BinTodos, setBinTodos] = useState([])
  useEffect(() => {
    if (localStorage.getItem("bin")) {
      setBinTodos(JSON.parse(localStorage.getItem("bin")))
    }
  }, [])
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