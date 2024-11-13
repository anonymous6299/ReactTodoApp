import Home from "../components/Home"
import SideNav from "../components/SideNav"


function App() {

  return (
    <div className="flex overflow-y-scroll">
    <div><SideNav/></div>
    <div className="w-full"><Home/></div>
    </div>
  )
}

export default App
