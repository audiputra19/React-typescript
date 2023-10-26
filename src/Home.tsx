import { faHatCowboy, faMobileScreen, faShirt, faShoePrints, faSocks, faStar, faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "./InterfaceApi";

const Home = () => {
    const [post, setPost] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3000/product')
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);

    const dtpost = (data: Product, i:number) => {
        const pricedisc = data.price * (data.disc/100);
        const totaldisc = data.price - pricedisc;
        function Disc(){
            if(data.disc !== 0){
                return (
                    <div className="px-2">
                        <label className="text-xs line-through text-gray-800 font-semibold pr-1">Rp. {data.price.toLocaleString('id-ID')}</label>
                        <label className="text-xs text-red-500 font-bold">{data.disc}%</label>
                    </div>
                )
            }
            else 
                return (
                    <div></div>
                )
        }

        return (
            <div className="bg-white rounded-lg shadow-md sm:w-48 cursor-pointer" key={i} onClick={() => navigate(`/Details/${data.id}`)}>
                <div>
                    <img className="rounded-t-lg h-40 w-full object-cover sm:h-48" src={data.img}  />
                </div>
                <div className="px-2 pt-2">
                    <label className="text-sm font-bold line-clamp-2">{data.title}</label>
                </div>
                <div className="px-2">
                    <label className="text-xs text-gray-400 font-bold">{data.category}</label>
                </div>
                <Disc/>
                <div className="px-2 pb-2 flex justify-between">
                    <div>
                        <label className="text-sm text-green-600 font-bold">Rp. {totaldisc.toLocaleString('id-ID')}</label>
                    </div> 
                    <div>
                        <FontAwesomeIcon icon={faStar} className="text-gray-600 text-sm pr-1" />
                        <label className="text-xs text-gray-800">({data.rate})</label>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="m-3">
            <div>
                <div className="sm:hidden mt-6">
                    <label className="font-bold text-gray-800">Category</label>
                </div>
                <div className="sm:hidden mt-3 pb-4 overflow-auto">
                    <div className="flex gap-6 text-gray-800">
                        <div className="grid w-fit place-items-center" onClick={() => navigate(`/Mainpage/1`)}>
                            <div className="bg-gray-100 p-2 rounded-xl">
                                <FontAwesomeIcon icon={faShirt} size="lg" />
                            </div>
                            <div className="text-xs font-bold pt-1">
                                <label>Top</label>
                            </div>
                        </div>
                        <div className="grid w-fit place-items-center" onClick={() => navigate(`/Mainpage/2`)}>
                            <div className="bg-gray-100 p-2 rounded-xl">
                                <FontAwesomeIcon icon={faShoePrints} size="lg" />
                            </div>
                            <div className="text-xs font-bold pt-1">
                                <label>Shoes</label>
                            </div>
                        </div>
                        <div className="grid w-fit place-items-center" onClick={() => navigate(`/Mainpage/3`)}>
                            <div className="bg-gray-100 p-2 rounded-xl">
                                <FontAwesomeIcon icon={faSuitcase} size="lg" />
                            </div>
                            <div className="text-xs font-bold pt-1">
                                <label>Bag</label>
                            </div>
                        </div>
                        <div className="grid w-fit place-items-center" onClick={() => navigate(`/Mainpage/4`)}>
                            <div className="bg-gray-100 p-2 rounded-xl">
                                <FontAwesomeIcon icon={faHatCowboy} size="lg" />
                            </div>
                            <div className="text-xs font-bold pt-1">
                                <label>Hat</label>
                            </div>
                        </div>
                        <div className="grid w-fit place-items-center" onClick={() => navigate(`/Mainpage/5`)}>
                            <div className="bg-gray-100 p-2 rounded-xl">
                                <FontAwesomeIcon icon={faSocks} size="lg" />
                            </div>
                            <div className="text-xs font-bold pt-1">
                                <label>Socks</label>
                            </div>
                        </div>
                        <div className="grid w-fit place-items-center" onClick={() => navigate(`/Mainpage/6`)}>
                            <div className="bg-gray-100 p-2 rounded-xl">
                                <FontAwesomeIcon icon={faMobileScreen} size="lg" />
                            </div>
                            <div className="text-xs font-bold pt-1">
                                <label>Gadget</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 sm:mx-9 sm:mt-8">
                    <label className="font-bold text-gray-800 sm:text-lg">Discover</label>
                </div>
                <div className="mt-3 sm:mx-9 sm:mt-6">
                    <div className="grid grid-cols-2 gap-3 sm:flex">
                        {post.map(dtpost)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;