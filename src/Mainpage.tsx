import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Mainpage = () => {
    const {id} = useParams();
    const [post, setPost] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/product?idcategory=${id}`)
            .then(res => {
                setPost(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    });

    const dtpost = (data, i) => {
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
            <div className="mt-3">
                <div className="grid grid-cols-2 gap-3">
                    {post.map(dtpost)}
                </div>
            </div>
        </div>
    )
}

export default Mainpage;