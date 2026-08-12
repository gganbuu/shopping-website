import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { NavigationBar } from './NavigationBar/NavigationBar';
import { Home } from './Home/Home';
import { About } from './About/About';
import { Adopt } from './Adopt/Adopt';
import { getCats } from './Adopt/getCats';
import {getCat} from './CardsContainer/getCat'
import { CatPage } from './CatPage/CatPage';
import { Cart } from './Cart/Cart';
import './index.css'

const Layout = () => {
  return (
    <>
      <header>
        <NavigationBar/>
      </header>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "adopt",
        element: <Adopt/>,
        loader: () => getCats(),
      },
      {
        path: "adopt/:catName",
        element: <CatPage/>,
        loader: ({ params }) => getCat(params.catName),
      },
      {
        path: "cart",
        element: <Cart/>
      }
    ]
  }
])


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home/>
//   },
//   {
//     path: "about",
//     element: <About/>
//   },
//   {
//     path: "adopt",
//     element: <Adopt/>,
//     loader: () => getCats(),
//   },
//   {
//     path: "adopt/:catName",
//     element: <CatPage/>,
//     loader: ({ params }) => getCat(params.catName),
//   },
//   {
//     path: "cart",
//     element: <Cart/>
//   }
// ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

