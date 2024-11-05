import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import AddTodo from '../components/AddTodo.jsx';
import Todos from '../components/Todos.jsx';
import UpdTodo from '../components/UpdTodo.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/addTodo",
    element: <AddTodo/>,
  },
  {
    path: "/AllTodos",
    element: <Todos/>,
  },
  {
    path: "/UpdTodo/:id",
    element: <UpdTodo/>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
