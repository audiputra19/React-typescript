import { faArrowLeft, faBagShopping, faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Layoutmain = () => {
    const navigate = useNavigate();
    const { transactions } = useSelector(state => state.product);

    function Cart(){
        if(transactions.length !== 0){
            return (
                <div onClick={() => navigate(`/Cart/`)}>
                    <div className="absolute bg-red-500 sm:ml-[16px] ml-[20px] mt-[2px] text-[10px] text-white px-1 rounded-full border-1 border-white cursor-pointer">
                        {transactions.length}
                    </div>
                    <div className="sm:pl-2 sm:mx-0 mx-3 text-gray-800 pt-1 sm:cursor-pointer">
                        <FontAwesomeIcon icon={faBagShopping} size="lg" />
                    </div>
                </div>
            )
        }
        return (
            <div className="sm:pl sm:mx-0 mx-3 text-gray-800 pt-1 sm:cursor-pointer" onClick={() => navigate(`/Cart/`)}>
                <FontAwesomeIcon icon={faBagShopping} size="lg" />
            </div>
        )
    }

    return (
        <div className="">
            <div className="sticky top-0 bg-white p-3 sm:px-12 sm:py-3 border-b">
                <div className="flex justify-between">
                    <div className="left-0 pt-1" onClick={() => { navigate(-1) }}>
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    </div>
                    <div className="flex p-1 ml-3 rounded-xl bg-gray-100 w-full">
                        <div className="pl-2 text-gray-800">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <div className="w-full pl-2">
                            <input type="text" className="text-sm w-full bg-transparent focus:outline-none focus:outline-offset-0 focus:ring-0" placeholder="Search..."/>
                        </div>
                    </div>
                    <div className="flex">
                        <Cart/>
                        <div className="sm:hidden bg-green-600 rounded-full px-3 py-1 text-white">
                            <FontAwesomeIcon icon={faBars} size="sm"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layoutmain; 