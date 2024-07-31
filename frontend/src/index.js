import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Signin from './pages/signin/Signin';
import MainPage from './pages/mainpage/MainPage';
import Settings from './pages/settings/Settings';
import Quiz from './pages/quizpage/Quiz';
import Inquiz from './pages/inquiz/Inquiz';
import { Provider } from 'react-redux';
import store from './store';
import QuizForm from './pages/createquiz/CreateQuiz';
import QuizEditor from './pages/quizadding/QuizAdding';

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
       {
        path:"/",
        element:<Home/>
       },
      {
        path:"/signup",
        element:<Signup/>
      },
      {
        path:"/signin",
        element:<Signin/>
      },
      {
        path:"/main",
        element:<MainPage/>
      },
      {
        path: '/settings',
        element:<Settings/>
      },
      {
        path: "/quiz/:id",
        element: <Quiz/>
      },
      {
        path: "/inquiz/:id",
        element: <Inquiz/>
      },
      {
        path:"*",
        element:<h1>Error Page</h1>
      },
      {
        path: '/createquiz',
        element: <QuizForm/>
      },
      {
        path:'/quizeditor',
        element:<QuizEditor/>
      }
    ] 
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router}/>

  </Provider>
);


