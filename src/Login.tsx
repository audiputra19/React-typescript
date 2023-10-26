import { faCube } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState();
    const [pass, setPass] = useState();
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUser(e.target.value);
    }

    const handlePassword = (e) => {
        setPass(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(user === "admin" && pass === "admin"){
            navigate('/home');
        } else {
            console.log("error")
        }
    }

    const handleCheck = (e) => {
        if(e.target.checked){
            document.getElementById('pass').type = "text";
        } else {
            document.getElementById('pass').type = "password";
        }
    }

    return (
        <div className="fixed inset-0 flex items-center sm:bg-gray-100">
            <div className="mx-10 w-full sm:mx-[500px] sm:bg-white sm:border sm:border-gray-100 sm:p-10 sm:py-10 sm:rounded-xl sm:shadow-lg">
                <div className="flex justify-center">
                    <div className="mb-10 p-5 shadow-md rounded-full">
                        <FontAwesomeIcon icon={faCube} size="3x" className="text-gray-800" />
                    </div>
                </div>
                <div className="">
                    <div className="text-xl font-bold mb-5 text-gray-800">
                        <label>Login</label>  
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="text" className="border w-full p-3 px-5 my-3 text-sm rounded-full bg-gray-100" onChange={handleUsername} placeholder="Username" />
                        </div>
                        <div>
                            <input type="password" id="pass" className="border w-full p-3 text-sm px-5 rounded-full bg-gray-100" onChange={handlePassword} placeholder="Password"/>
                        </div>
                        <div className="my-5 mx-5 flex items-center">
                            <input type="checkbox" onClick={handleCheck} className="accent-gray-600" />
                            <label className="pl-2 text-gray-400 text-sm">Show Password</label>
                        </div>
                        <div>
                            <button type="submit" className="bg-gray-800 text-white w-full p-3 rounded-full">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;