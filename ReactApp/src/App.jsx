import Home from "../components/Home"
import SideNav from "../components/SideNav"


function App() {

  return (
    <div className="flex">
    <div><SideNav/></div>
    <div className="w-full overflow-y-scroll h-[100vh]"><Home/></div>
    </div>
  )
}

export default App
