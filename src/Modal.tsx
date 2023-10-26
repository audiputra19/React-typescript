import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { hisTransactionData } from "./Redux/Product/Action";
import { v4 } from "uuid";
import moment from "moment";

const Modal = ({visible, onClose}) => {

    const dispatch = useDispatch();
    const { transactions } = useSelector(state => state.product);

    const handleOnClose = (e) => {
        if(e.target.id === "container")
            onClose();
    }

    if(!visible){ return null; }

    const saveHistory = () => {
        const newTransaction = [...transactions];
        dispatch(hisTransactionData({
            id: v4(),
            data: newTransaction,
            date: moment().format("YYYY-MM-DD hh-mm-ss")
        }))

        onClose();
    }

    return (
        <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
            <div className="sm:w-96 w-72 bg-white rounded-lg">
                <div className="m-5">
                    <div className='text-center text-gray-800 text-3xl'>
                        <FontAwesomeIcon icon={faMoneyCheckDollar} />
                    </div>
                    <div className="text-center font-bold text-lg mb-2">Checkout</div>
                    <div className="text-center font-medium text-sm">Are You Sure You Want to Checkout This Product?</div>
                </div>
                <hr className="border-gray-150" />
                <div className="flex m-3 sm:m-5 justify-center gap-4">
                    <div><button onClick={onClose} className="border border-gray-800 text-sm text-gray-800 rounded-md p-1 pl-5 pr-5 hover:bg-gray-800 hover:text-white">Cancel</button></div>
                    <div><button onClick={saveHistory} className="border border-gray-800 text-gray-800 text-sm rounded-md p-1 pl-7 pr-7 hover:bg-gray-800 hover:text-white">OK</button></div>
                </div>
            </div>
        </div>
    )
}

export default Modal;