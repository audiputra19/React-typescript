import { useRoutes } from "react-router-dom";
import Home from "./Home";
import Layout from "./Layout";
import Details from "./Details";
import Layoutdetail from "./Layoutdetail";
import Layoutmain from "./Layoutmain";
import Mainpage from "./Mainpage";
import Layoutsearch from "./Layoutsearch";
import Searchpage from "./Searchpage";
import Cart from "./Cart";
import History from "./History";
import Login from "./Login";

const Nav = () => {
    let routes = [
        {
            path: "/",
            element: <Layout/>,
            children: [
                {
                    path: "/Home/",
                    element: <Home/>
                },
                {
                    path: "/History/",
                    element: <History/>
                }
            ]
        },
        {
            path: "/",
            element: <Layoutdetail/>,
            children: [
                {
                    index: true,
                    element: <Login/>
                }
            ]
        },
        {
            path: "/Details/",
            element: <Layoutdetail/>,
            children: [
                {
                    path: "/Details/:id",
                    element: <Details/>
                }
            ]
        },
        {
            path: "/Mainpage/",
            element: <Layoutmain/>,
            children: [
                {
                    path: "/Mainpage/:id",
                    element: <Mainpage/>
                }
            ]
        },
        {
            path: "/Searchpage/",
            element: <Layoutsearch/>,
            children: [
                {
                    path: "/Searchpage/",
                    element: <Searchpage/>
                }
            ]
        },
        {
            path: "/Cart/",
            element: <Layoutdetail/>,
            children: [
                {
                    path: "/Cart/",
                    element: <Cart/>
                }
            ]
        }
    ];

    let element = useRoutes(routes);

    return (
        <div>
            {element}
        </div>
    )
}

export default Nav; 