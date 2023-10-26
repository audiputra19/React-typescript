import { faArrowLeft, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { delTransactionData, minTransactionData, plusTransactionData } from "./Redux/Product/Action";
import moment from "moment";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "./Redux/hook";
import { TransactionI } from "./InterfaceApi";

const Cart = () => {
    const { transactions } = useAppSelector(state => state.product);
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDisc, setTotalDisc] = useState(0);
    const [totalAll, setTotalAll] = useState(0);
    //const [sortList, setSortList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch();
    const handleOnClose = () => setShowModal(false);

    useEffect(() => {
        let resultPrice = 0;
        let resultDisc = 0;
        transactions.forEach(item => {
            const price = item.price * item.qty;
            const pricedisc = (item.price * (item.disc/100)) * item.qty;
            resultPrice += price;
            resultDisc += pricedisc;
        });
        setTotalPrice(resultPrice);
        setTotalDisc(resultDisc);
        setTotalAll(resultPrice-resultDisc);
    }, [transactions]);

    // useEffect(() => {
    //     //transactions.sort((a,b) => new Date(a.date) - new Date(b.date))
    //     setSortList(transactions)
    // },[])

    const post = (item: TransactionI, i:number) => {
        const price = item.price * item.qty;
        const pricedisc = (item.price * (item.disc/100)) * item.qty;
        const totaldisc = price - pricedisc;

        function Disc() {
            if(item.disc !== 0){
                return (
                    <div className="text-xs text-gray-400 line-through font-bold">Rp. {price.toLocaleString('id-ID')}</div>
                )
            } 
            else 
                return (
                    <div></div>
                )
        }

        function Detail() {

            if(item.size !== ''){
                return (
                    <div className="text-xs text-gray-500">
                        <label>{item.size}</label>
                    </div>
                )
            } 
            else 
                return (
                    <div></div>
                )            
        }

        /*<div>
            <label>{moment(item.transactionDate, "DD/MM/Y hh:mm:ss").format("DD MMMM YYYY, hh:mm:ss a")}</label>
        </div>*/
        return (
            <>
                <div key={i}>
                    <div className="flex">
                        <div>
                            <img src={item.img} className="h-20 w-24 rounded-xl object-cover" />
                        </div>
                        <div className="px-3 w-full">
                            <div className="sm:text-base text-sm font-bold text-gray-800">{item.title}</div>
                            <Detail/>
                            <div className="flex justify-between items-center pt-2">
                                <div>
                                    <Disc/>
                                    <div className="text-sm font-bold text-green-500">Rp. {totaldisc.toLocaleString('id-ID')}</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-2 border border-gray-300 border-2 rounded-full text-gray-400">
                                        <button className="text-base cursor-pointer px-2 py-1 rounded-l-full" onClick={() => dispatch(minTransactionData(item.id))}>-</button>
                                        <input className="text-sm w-[20px] text-center bg-white" value={item.qty} disabled />
                                        <button className="text-sm cursor-pointer px-2 py-1 rounded-r-full" onClick={() => dispatch(plusTransactionData(item.id))}>+</button>
                                    </div>
                                    <button onClick={() => dispatch(delTransactionData(item.id))}>
                                        <FontAwesomeIcon icon={faTrashCan}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b-4 my-5 border-gray-100"></div>
            </>
        )
    }

    return (
        <div>
            <div className="flex justify-between p-3 sm:px-12 sm:py-3 border-b sticky top-0 bg-white text-gray-800">
                <div className="left-0 pt-1 cursor-pointer" onClick={() => { navigate(-1) }}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </div>
                <div className="text-lg font-bold">
                    <label>Cart</label>
                </div>
                <div></div>
            </div>
            <div className="sm:hidden m-5">{ transactions.map(post) }</div>
            <div className="hidden sm:block">
                <div className="mx-36 my-10 flex">
                    <div className="w-full">{ transactions.map(post) }</div>
                    <div className="w-96 ml-16">
                        <div className="border-2 rounded-xl p-5">
                            <div className="flex justify-between text-sm">
                                <div className="font-semibold text-gray-500">
                                    <label>Total Price</label>        
                                </div>
                                <div className="font-semibold text-gray-500">
                                    <label>Rp. {totalPrice.toLocaleString('id-ID')}</label>
                                </div>
                            </div>
                            <div className="flex justify-between py-3 text-sm">
                                <div className="font-semibold text-gray-500">
                                    <label>Total Discount</label>        
                                </div>
                                <div className="font-semibold text-gray-500">
                                    <label>Rp. {totalDisc.toLocaleString('id-ID')}</label>
                                </div>
                            </div>
                            <div className="border-b-4 border-gray-100"></div>
                            <div className="flex justify-between py-3">
                                <div className="font-bold text-gray-800">
                                    <label>Sub Total</label>        
                                </div>
                                <div className="font-bold text-gray-800">
                                    <label>Rp. {totalAll.toLocaleString('id-ID')}</label>
                                </div>
                            </div>
                            <div className="bg-gray-800 p-3 w-full flex justify-center text-white text-sm rounded-full cursor-pointer" onClick={() => setShowModal(true)}>
                                Checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden sticky bottom-0 bg-white p-5 border-t">
                <div>
                    <div className="flex justify-between text-sm">
                        <div className="font-semibold text-gray-500">
                            <label>Total Price</label>        
                        </div>
                        <div className="font-semibold text-gray-500">
                            <label>Rp. {totalPrice.toLocaleString('id-ID')}</label>
                        </div>
                    </div>
                    <div className="flex justify-between py-3 text-sm">
                        <div className="font-semibold text-gray-500">
                            <label>Total Discount</label>        
                        </div>
                        <div className="font-semibold text-gray-500">
                            <label>Rp. {totalDisc.toLocaleString('id-ID')}</label>
                        </div>
                    </div>
                    <div className="border-b"></div>
                    <div className="flex justify-between py-3">
                        <div className="font-bold text-gray-800">
                            <label>Sub Total</label>        
                        </div>
                        <div className="font-bold text-gray-800">
                            <label>Rp. {totalAll.toLocaleString('id-ID')}</label>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-3 w-full flex justify-center text-white text-sm rounded-full" onClick={() => setShowModal(true)}>
                        <label>Checkout</label>
                    </div>
                </div> 
            </div>
            <Modal onClose={handleOnClose} visible={showModal} />
        </div>
    )
}

export default Cart;