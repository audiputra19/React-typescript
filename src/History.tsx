import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveTransactionData } from "./Redux/Product/Action";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./Redux/hook";
import { Product, TransactionI } from "./InterfaceApi";

const History = () => {
    const { hisTransactions } = useAppSelector(state => state.product)
    const [prod, setProd] = useState<Array<{idTransaction:string;date:Date;} & TransactionI>>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const temphHisTransactions: Array<{idTransaction:string;date:Date;qty:number} & TransactionI> = [];
        hisTransactions.forEach(item => {
            item.data.forEach(dt => {
                temphHisTransactions.push({
                    ...dt,
                    idTransaction: item.id,
                    date: item.date,
                })
            })
        })
        //temphHisTransactions.sort((a, b) => a.date - b.date).reverse()
        setProd(temphHisTransactions);
    },[])

    const transaction = (post:{idTransaction:string;date:Date;} & TransactionI, i:number) => {
        const price = post.price * post.qty;
        const pricedisc = (post.price * (post.disc/100)) * post.qty;
        const totaldisc = price - pricedisc;

        function Disc() {
            if(post.disc !== 0){
                return (
                    <div className="text-xs text-gray-400 line-through font-bold">Rp. {price.toLocaleString('id-ID')}</div>
                )
            } 
            else 
                return (
                    <div></div>
                )
        }

        const handleBuyBack = () => {
            dispatch(saveTransactionData({
                id: post.id,
                img: post.img,
                title: post.title,
                price: post.price,
                disc: post.disc,
                qty: 1,
                size: post.size[0],
                transactionDate: new Date()
            }))
            navigate(`/cart`)
        }
        return (
            <div className="border-t border-gray-100 rounded-xl shadow-md shadow-gray-200 my-3 p-3">
                <div key={i}>
                    <div className="flex justify-between border-b mb-3 pb-3">
                        <div className="">
                            <label className="text-xs text-gray-800">{moment(post.date, "YYYY-MM-DD").format("DD MMM YYYY")}</label>
                        </div>
                        <div>
                            <div className="text-green-600 text-lg rounded-lg">
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div>
                            <img src={post.img} className="h-10 w-12 rounded-lg object-cover" />
                        </div>
                        <div className="px-3 w-full">
                            <div className="sm:text-base text-sm font-bold text-gray-800">{post.title}</div>
                            <div className="text-xs text-gray-500">
                                <label>x {post.qty}</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <div className="pt-2">
                                <label className="text-xs text-gray-500">Total Shopping</label>
                            </div>
                            <div className="flex items-center">
                                <div className="text-sm font-bold text-gray-800">Rp. {totaldisc.toLocaleString('id-ID')}</div>
                            </div>
                        </div>
                        <div className="flex items-center pt-3">
                            <button className="text-xs px-4 py-2 bg-gray-800 text-white rounded-xl">Review</button>
                            <button className="text-xs px-4 py-2 border border-gray-800 text-gray-800 rounded-xl ml-2" onClick={handleBuyBack}>Buy Back</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="m-3 sm:mx-96 sm:my-10">
                {prod.map(transaction)}
            </div>
        </div>
    )
}

export default History;