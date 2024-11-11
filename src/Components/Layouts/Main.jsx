import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navbar";

export default function Main() {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    )
}
