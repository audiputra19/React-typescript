import { faBagShopping, faBars, faCube, faFileCircleCheck, faHeart, faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {

    const navigate = useNavigate();
    const {transactions} = useSelector(state: Product => state.product);

    function Cart(){
        if(transactions.length !== 0){
            return (
                <div>
                    <div onClick={() => navigate(`/Cart/`)}>
                        <div className="absolute bg-red-500 sm:ml-[16px] ml-[20px] mt-[2px] text-[10px] text-white px-1 rounded-full border-1 border-white cursor-pointer">
                            {transactions.length}
                        </div>
                        <div className="sm:pl-2 sm:mx-0 mx-3 text-gray-800 pt-1 sm:cursor-pointer" >
                            <FontAwesomeIcon icon={faBagShopping} size="lg" />
                        </div>
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
                <div className="flex sm:justify-between">
                    <div className="hidden sm:block text-2xl font-bold text-gray-800">
                        <FontAwesomeIcon icon={faCube} className="pr-2" />
                        <label>Shopping</label>
                    </div>
                    <div className="sm:hidden flex w-full">
                        <div className="flex p-1 rounded-xl bg-gray-100 w-full" onClick={() => navigate(`/Searchpage/`)}>
                            <div className="pl-2 text-gray-800">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <div className="w-full pl-2">
                                <input type="text" className="text-sm w-full bg-transparent focus:outline-none focus:outline-offset-0 focus:ring-0" placeholder="Search..."/>
                            </div>
                        </div>
                        <Cart/>
                        <div className="sm:hidden bg-green-600 rounded-full px-3 pt-1 text-white">
                            <FontAwesomeIcon icon={faBars} size="sm"/>
                        </div>
                    </div>
                    <div className="hidden sm:block sm:flex gap-4">
                        <div className="flex p-1 rounded-xl bg-gray-100 w-full mr-2">
                            <div className="pl-2 text-gray-800">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <div className="w-full pl-2">
                                <input type="text" className="text-sm w-full bg-transparent focus:outline-none focus:outline-offset-0 focus:ring-0" placeholder="Search..."/>
                            </div>
                        </div>
                        <div className="text-gray-800 pt-1 cursor-pointer">
                            <FontAwesomeIcon icon={faHeart} size="lg" />
                        </div>
                        <Cart/>
                        <div className="text-gray-800 pl-2 pt-1 cursor-pointer">
                            <FontAwesomeIcon icon={faFileCircleCheck} size="lg" onClick={() => navigate(`/History`)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white">
                <Outlet/>
            </div>
            <div className="sm:hidden sticky bottom-0 px-3 pb-3">
                <div className="bg-white border rounded-2xl shadow-xl">
                    <div className="p-3 grid grid-cols-3 gap-4 place-items-center">
                        <div className="text-gray-800">
                            <FontAwesomeIcon icon={faHouse} size="lg" onClick={() => navigate(`/Home/`)}/>
                        </div>
                        <div className="text-gray-800">
                            <FontAwesomeIcon icon={faHeart} size="lg" />
                        </div>
                        <div className="text-gray-800">
                            <FontAwesomeIcon icon={faFileCircleCheck} size="lg" onClick={() => navigate(`/History/`)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout; 