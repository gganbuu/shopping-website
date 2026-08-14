import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import { Layout } from './layouts/Layout';
import { Home } from './pages/Home/Home';
import { About } from './pages/About/About';
import { Adopt } from './pages/Adopt/Adopt'
import { getAllCats } from './services/getAllCats';
import {getCat, getCats} from './services/getCat'
import { CatPage } from './pages/CatPage/CatPage';
import { Cart } from './pages/Cart/Cart';
import './index.css'


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
        loader: () => getAllCats(),
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


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)

