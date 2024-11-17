import { useEffect } from "react"
import Home from "../components/Home"
import SideNav from "../components/SideNav"


function App() {
  useEffect(() => {
    if (!localStorage.getItem("todo")) {
      localStorage.setItem("todo",JSON.stringify([]));
    }
    if (!localStorage.getItem("bin")) {
      localStorage.setItem("bin",JSON.stringify([]));
    }
  }, [])
  
  return (
    <div className="flex">
    <div><SideNav/></div>
    <div className="w-full overflow-y-scroll h-[100vh]"><Home/></div>
    </div>
  )
}

export default App

