import { faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layoutsearch = () => {
    const [input, setInput] = useState();
    const navigate = useNavigate();
    const ref = useRef(null);
    useEffect(() => {
        ref.current.focus()
    })

    const handleSubmit = (e) => e.preventDefault();

    function handleSearch() {
        
    }

    return (
        <div className="">
            <div className="sticky top-0 bg-white p-3 sm:px-12 sm:py-3 border-b">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                            <div className="left-0 pt-1" onClick={() => { navigate(-1) }}>
                                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                            </div>
                            <div className="flex p-1 ml-3 rounded-xl bg-gray-100 w-full">
                                <div className="pl-2 text-gray-800">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </div>
                                <div className="w-full pl-2">
                                    <input type="text" ref={ref} value={input} onInput={e => setInput(e.target.value)} className="text-sm w-full bg-transparent focus:outline-none focus:outline-offset-0 focus:ring-0" placeholder="Search..."/>
                                </div>
                            </div>
                            <div className="">
                                <button className="text-xs bg-green-600 text-white py-2 px-3 ml-3 rounded-full" onClick={handleSearch}>Search</button>
                            </div>
                    </div>
                </form>
            </div>
            <div className="bg-white">
                <Outlet/>
            </div>
        </div>
    )
}

export default Layoutsearch; 