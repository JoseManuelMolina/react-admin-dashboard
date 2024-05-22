import "./App.css";
import { Home } from "./pages/home/Home.js";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Clients from "./pages/clients/Clients.js";
import Projects from "./pages/projects/Projects.js";
import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import Menu from "./components/menu/Menu.js";
import { Login } from "./pages/login/Login.js";
import "./styles/global.scss";


function App() {

  const Layout = () =>{
    return (
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/proyectos",
          element: <Projects />,
        },
        {
          path: "/clientes",
          element: <Clients />,
        },
        
      ]
    },
    {
      path: "/login",
      element: <Login />
    }
  ]);

  return <RouterProvider router={router}/>;
}

export default App;
