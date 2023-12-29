import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Hollywood from "./pages/Hollywood";
import Explosiva from "./pages/Explosiva";
import Tongo from "./pages/Tongo";
import Cantada from "./pages/Cantada";
import Musical from "./pages/Musical";
import Error from "./pages/Error";
import Stream from "./pages/Stream";
import Header from "./components/Header";

const Dashboard = () => {
  return (
    <div className="max-h-screen min-h-full grid grid-rows-[auto_minmax(0,_1fr)]">
      <Header />
      <Outlet />
      {/* <div>Footer</div> */}
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/hollywood",
        element: <Hollywood />,
      },
      {
        path: "/explosiva",
        element: <Explosiva />,
      },
      {
        path: "/tongo",
        element: <Tongo />,
      },
      {
        path: "/cantada",
        element: <Cantada />,
      },
      {
        path: "/musical",
        element: <Musical />,
      },
    ],
  },
  {
    path: "/stream/tongo",
    element: <Stream quina="tongo" />,
  },
  {
    path: "/stream/explosiva",
    element: <Stream quina="explosiva" />,
  },
  {
    path: "/stream",
    element: <Stream />,
  },
  {
    path: "*",
    element: <Error />,
  },
], { basename: "/quinaexperience/" });

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
