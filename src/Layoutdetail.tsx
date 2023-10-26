import { Outlet } from "react-router-dom";

const Layoutdetail = () => {
    return (
        <div className="">
            <div className="bg-white">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layoutdetail; 