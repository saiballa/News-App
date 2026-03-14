import React, { useEffect, useState } from "react"
import type { UserDetails } from "../../utils/inter"
import { API_KEY } from "../../utils/inter";


const MainUi:React.FC=()=>{

    const [newsList,setNewsList] = useState<UserDetails[]>([]);
    const [loading,setLoadng] = useState<boolean>(true);
    const [error,setError] = useState<boolean>(false);
    const [category,setCategory] = useState<string>("business");

    const categories = ["business","entertainment","general","health","science","sports","technology"];

    useEffect(()=>{
        const fetchApiData = async ()=>{
            try {
            const response = await fetch(` https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY} `);
            if(response.status !== 200){
                throw new Error("Something gone wrong!...");
            }
            const data = await response.json();
            console.log(data.articles);
            setNewsList(data.articles);
            setLoadng(false);
        } catch (error) {
            setLoadng(false);
            setError(true);
            }
        }
        fetchApiData();
    },[category]);

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setCategory(e.target.value);
        setLoadng(true);
    }
        const handleError = (e:React.ChangeEvent<HTMLImageElement>) => {
        e.target.onerror = null;
        e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcCBHgbS23kyBw2r8Pquu19UtKZnrZmFUx1g&s";
    };

    if(loading){
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-56 h-56 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }
    if(error){
        return <h2 className="text-red-500">There is something wrong!..</h2>;
    }
    if(newsList.length === 0){
        return <h2>Got the response. but didn't get full data</h2>
    }

    return(
        <>
            <div className="min-h-screen">
                <h1 className="text-5xl text-amber-500 italic underline mb-6">Top Headlines</h1>
                <div className="mb-3">
                    <label className="text-xl">Choose Category : </label>
                    <select onChange={handleChange} className="w-48 p-1.5 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {categories.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-wrap justify-center">
                    {
                        newsList.map((listItem)=>(
                            <div key={listItem.source.name} className="max-w-xs rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 m-4">
                                <div>
                                    <img src={listItem.urlToImage} alt="image" onError={handleError} className="w-full h-48 object-cover" />
                                </div>
                                <div className="p-6">
                                    <p className="text-xl font-bold text-gray-800 mb-2">{listItem.title}</p>
                                    <p className="text-gray-600 text-base mb-4">{listItem.description}</p>
                                    <p className="font-semibold text-lg mb-2">Author : {listItem.author}</p>
                                    <p className="text-gray-600 truncate min-w-0">Published at : {`${listItem.publishedAt.split('T')[0]} : ${listItem.publishedAt.split("T")[1]}`}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default MainUi;