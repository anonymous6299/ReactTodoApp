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
import Bin from '../components/Bin.jsx';
import ContextState from '../ContextAPI/ContextState.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <ContextState><App /></ContextState>,
  },
  {
    path: "/addTodo",
    element: <ContextState><AddTodo /> </ContextState>,
  },
  {
    path: "/AllTodos",
    element: <ContextState><Todos /> </ContextState>,
  },
  {
    path: "/UpdTodo/:id",
    element: <ContextState><UpdTodo /> </ContextState>,
  },
  {
    path: "/bin",
    element: <ContextState><Bin /> </ContextState>,
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
