import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages/Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Clients from "./pages/Clients/Clients.js";
import Projects from "./pages/Projects/Projects.js";
import Navbar from "./components/navbar/Navbar.js";
import Footer from "./components/footer/Footer.js";
import Menu from "./components/menu/Menu.js";


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
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/clients",
          element: <Clients />,
        },
      ]
    },
  ]);

  return <RouterProvider router={router}/>;
}

export default App;
