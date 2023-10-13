import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Blog from "./Blog";
import Post from "./Post";
import Login from "./Login";
import Author from "./Author";
import CreatePost from "./CreatePost";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import ProtectedRoute from "./ProtectedRoute";
import { useState , useEffect} from "react";
// import ErrorPage from "./ErrorPage";



const Router = () => {
  
  const [token, setToken] = useState(false);

  console.log(token);

  const routesForPublic = [
    {
      path: "/",
      element: <Blog />,
    },
    {
      path: "/:id",
      element: <Post />,
    },
    {
      path: "/login",
      element: <Login setToken={setToken} />
    },
  ]
  
  const routesForAuthenticatedOnly = [
    {
      path: "/author",
      element: <ProtectedRoute token={token}/>,
      children: [
        {
          index: true,
          element: <Author setToken={setToken}/>
        },
        {
          path: "create",
          element: <CreatePost />
        },
        {
          path: "delete/:id",
          element: <DeletePost />
        },
        {
          path: "edit/:id",
          element: <EditPost />
        }
      ],
    }
  ]

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);




  
  
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Blog />,
  //   //   errorElement: <ErrorPage />,
  //   },
  //   {
  //     path: "/:id",
  //     element: <Post />,
  //   },
  //   {
  //     path: "/author",
  //     element: <Author />
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />
  //   },
  //   {
  //     path: "/create",
  //     element: <CreatePost />
  //   },
  //   {
  //     path: "/delete/:id",
  //     element: <DeletePost />
  //   },
  //   {
  //     path: "/edit/:id",
  //     element: <EditPost />
  //   }
  // ]);

  return <RouterProvider router={router} />;
};

export default Router;