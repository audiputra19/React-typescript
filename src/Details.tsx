import { faArrowLeft, faBagShopping, faHeart, faMagnifyingGlass, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { saveTransactionData } from "./Redux/Product/Action";

const Details = () => {
    const {id} = useParams();
    const [prod, setProd] = useState([]);
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {transactions} = useSelector(state => state.product);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/product/${id}`)
            .then(res => {
                //console.log(res.data);
                setProd(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);

    const handleClick = (e) => {
        setSize(e);
    }

    console.log(size)

    function Disc(){
        const price = prod.price - 0;
        const pricedisc = prod.price * (prod.disc/100);
        const totaldisc = prod.price - pricedisc;
        if(prod.disc !== 0){
            return (
                <div>
                    <div className="text-gray-500 text-xs font-semibold flex pt-2 sm:text-sm">
                        <div className="bg-gray-200 text-gray-500 p-1 rounded-lg mr-1">
                            <label>{prod.disc}%</label>
                        </div>
                        <div className="pt-1">
                            <label className="line-through">Rp. {price.toLocaleString('id-ID')}</label>
                        </div>
                    </div>
                    <div className="text-green-600 text-sm font-bold sm:text-lg">
                        <label>Rp. {totaldisc.toLocaleString('id-ID')}</label>
                    </div>
                </div>    
            )
        }
        else 
            return (
                <div className="text-green-600 text-sm font-bold pt-2">
                    <label>Rp. {totaldisc.toLocaleString('id-ID')}</label>
                </div>
            )
    }

    function Size() {
        switch(prod.size) {
            case '':
                return;
            default:
                if(prod.size !== 0){
                    return (
                        <>
                            <div className="font-bold text-gray-800 mt-5 sm:text-lg">
                                <label>Size</label>
                            </div>
                            <div className="overflow-auto pb-3">
                                <div className="flex gap-3 text-sm text-gray-500 mt-2">
                                    {
                                        prod.size?.map((data, i) => {
                                            if(data===size) {
                                                    return (
                                                        <div className="flex justify-between w-full">
                                                            <button onClick={() => handleClick(data)} className="border rounded-full py-2 px-3 border-gray-300 font-bold bg-gray-800 text-white">
                                                                <div key={i}>{data}</div>
                                                            </button>    
                                                        </div> 
                                                    )
                                            }
                                            else
                                                    return(
                                                        <div className="flex justify-between w-full">
                                                            <button onClick={() => handleClick(data)} className="border rounded-full py-2 px-3 border-gray-300 font-bold">
                                                                <div key={i}>{data}</div>
                                                            </button>    
                                                        </div>    
                                                    )    
                                        })
                                    }
                                </div>    
                            </div>    
                        </>
                    )
                }
        }
    }

    function Stars() {
        const arr = [];
        for (let i = 0; i < prod.rate; i++) {
            arr.push(
                <div className="text-sm text-gray-800 sm:text-md">
                    <FontAwesomeIcon icon={faStar} />
                </div>
            );
        }
        return arr;
    }

    function Cart(){
        if(transactions.length !== 0){
            return (
                <div onClick={() => navigate(`/Cart/`)}>
                    <div className="absolute bg-red-500 sm:ml-[16px] ml-[8px] text-[10px] text-white px-1 rounded-full border-1 border-white cursor-pointer">
                        {transactions.length}
                    </div>
                    <FontAwesomeIcon icon={faBagShopping} size="lg" className="sm:pl-2 sm:pt-1 cursor-pointer text-gray-800 pt-1" />
                </div>
            )
        }
        return (
            <FontAwesomeIcon icon={faBagShopping} size="lg" className="sm:pl-2 sm:pt-1 cursor-pointer text-gray-800 pt-1" onClick={() => navigate(`/Cart/`)} />
        )
    }

    const increaseVal = () => {
        setQty(qty + 1);
    } 

    let decreaseVal = () => {
        setQty(qty - 1);
    }

    if(qty < 1){
        setQty(1);
    }

    const sendtoCart = () => {
        dispatch(saveTransactionData({
            id: prod.id,
            img: prod.img,
            title: prod.title,
            price: prod.price,
            disc: prod.disc,
            qty: qty,
            size: size,
            transactionDate: new Date().toLocaleString("id-ID")
        }));
    }

    return (
        <div>
            <div className="flex justify-between p-3 sm:px-12 sm:py-3 border-b sticky top-0 bg-white text-gray-800">
                <div className="left-0 pt-1 cursor-pointer" onClick={() => { navigate(-1) }}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </div>
                <div className="text-lg font-bold">
                    <label>Product Detail</label>
                </div>
                <div className="flex gap-4">
                    <div className="hidden sm:block sm:flex p-1 rounded-xl bg-gray-100 w-full mr-2">
                        <div className="pl-2 text-gray-800">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </div>
                        <div className="w-full pl-2">
                            <input type="text" className="text-sm w-full bg-transparent focus:outline-none focus:outline-offset-0 focus:ring-0" placeholder="Search..."/>
                        </div>
                    </div>    
                    <FontAwesomeIcon icon={faSearch} size="lg" className="sm:hidden cursor-pointer text-gray-800 pt-1" />
                    <Cart/>
                </div>
            </div>
            <div className="sm:flex sm:mt-16">
                <div className="sm:w-full sm:ml-32 sm:mr-24">
                    <img src={prod.img} className="h-96 w-full object-cover sm:rounded-xl sm:h-[500px]" />
                </div>
                <div className="p-3 sm:w-3/4 sm:mr-32">
                    <div>
                        <div className="font-bold sm:text-2xl text-lg text-gray-800">
                            <label>{prod.title}</label>
                        </div>
                        <Disc/>
                        <div className="pt-5 flex justify-between items-center">
                            <div className="flex">
                                <Stars/> 
                                <div className="text-sm pl-1 text-gray-500 sm:text-base">
                                    ({prod.rate})
                                </div>
                            </div>
                            <div>
                                <div className="flex gap-4 border border-gray-300 border-2 rounded-full text-gray-400">
                                    <button onClick={decreaseVal} className="text-base cursor-pointer px-2 py-1 rounded-l-full">-</button>
                                    <input className="text-sm w-[20px] text-center bg-white" value={qty} disabled />
                                    <button onClick={increaseVal} className="text-sm cursor-pointer px-2 py-1 rounded-r-full">+</button>
                                </div>
                            </div>
                        </div>
                        <Size/>
                        <div className="font-bold text-gray-800 mt-5 sm:text-lg">
                            <label>Spesification</label>
                        </div>
                        <div className="text-sm text-gray-500 pt-2 line-clamp-3 sm:text-base">
                            <div className="grid grid-cols-2 border-b pb-1">
                                <div>
                                    <label>Condition</label>
                                </div>
                                <div> 
                                    <label>{prod.condition}</label>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 pt-1 border-b pb-1">
                                <div>
                                    <label>Category</label>
                                </div>
                                <div> 
                                    <label>{prod.category}</label>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 pt-1 border-b pb-1">
                                <div>
                                    <label>Genre</label>
                                </div>
                                <div> 
                                    <label>{prod.genre}</label>
                                </div>
                            </div>
                        </div>
                        <div className="font-bold text-gray-800 mt-5 sm:text-lg">
                            <label>Description</label>
                        </div>
                        <div className="sm:hidden text-sm text-gray-500 pt-2 line-clamp-3 sm:text-base">
                            <label>{prod.desc}</label>
                        </div>
                        <div className="hidden sm:block text-gray-500 pt-2 text-base">
                            <label>{prod.desc}</label>
                        </div>
                        <div className="hidden sm:block mt-5">
                            <div className="w-full flex justify-center bg-gray-800 text-white font-bold p-3 rounded-full cursor-pointer" onClick={sendtoCart}>
                                Add to Cart
                            </div>
                        </div>
                        <div className="hidden sm:block mt-2">
                            <div className="w-full border border-gray-800 flex justify-center text-gray-800 font-bold p-3 rounded-full cursor-pointer">
                                Favorite <FontAwesomeIcon icon={faHeart} className="pt-1 pl-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sm:hidden sticky bottom-0 bg-white p-3 border-t">
                <div className="flex justify-between">
                    <div className="text-gray-800 pt-3">
                        <FontAwesomeIcon icon={faHeart} size="xl" />
                    </div>
                    <div className="bg-gray-800 p-3 w-full flex justify-center text-white text-sm rounded-full ml-3" onClick={sendtoCart}>
                        <label>Add to Chart</label>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Details;