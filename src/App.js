
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './RootLayout'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Login from './components/login/Login'
import UserProfile from './components/user-profile/UserProfile'
import AdminProfile from './components/admin-profile/AdminProfile'
import Users from './components/users/Users'
import User from './components/user/User'

function App() {

    const browserRouter=createBrowserRouter([{
      path:'/',
      element:<RootLayout />,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'register',
          element:<Register />
        },
        {
          path:'login',
          element:<Login />
        },
        {
          path:'user-profile',
          element:<UserProfile />
        },
        {
          path:'admin-profile',
          element:<AdminProfile />
        },
        {
          path:'users',
          element:<Users />
        },
        {
          path:'user',
          element:<User />
        }
      ]
    }])

  return (
    <div >
     <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
