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
import Header from "./components/Header";

const Dashboard = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* <div>Footer</div> */}
    </>
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
    path: "*",
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
