  import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// Pages and Components
import {  Login ,AuthLayout} from './components/index.js';
import Signupform from './pages/Sighupform.jsx';
import AddPost from "./pages/Addpost.jsx";
import EditPost from "./pages/EditPosts.jsx";
import Post from "./pages/Post.jsx";
import AllPosts from "./pages/Allposts.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: '/Signup',
        element: (
          <AuthLayout authentication={false}>
            <Signupform />
          </AuthLayout>
        )
      },
      {
        path: '/all-Posts',
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: '/posts/:slug',
        element: <Post />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
