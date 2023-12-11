'use client'
import { useState,useEffect } from "react";
import { fetchCategoryByName, fetchPostByCategoryId } from "../utils/api";
import Image from "next/image";
import Link from "next/link";
interface Blog {
    _id: string;
    title: string;
    content: string;
    image:string;
  }
const TechTrends = ()=>{
    const categoryName = 'Tech Trends'
    const[categoryId,setCategoryId] = useState(''); 
    const[articles,setArticles] = useState<Blog[]>([]);
    const extractFirst50Words = (content:string) => {
        const words = content.split(' ');
        const first40Words = words.slice(0, 40).join(' ');
        return first40Words;
      };
    async function getCategory(){
        const category = await fetchCategoryByName(categoryName);
        
        
        return category._id;
        // console.log(data);
    }
    const getArticles = async()=>{
        const data = await fetchPostByCategoryId(await getCategory());
        setArticles(data);
    }
    useEffect(()=>{
        //getCategory();
        getArticles();
    },[])
    return(
        <div>
            <h1 className="text-2xl font-medium text-center text-gray-700">Tech Trends</h1>
            
                {articles.length > 0 ?(
                    <div className="grid grid-cols-1 mx-auto lg:w-[650px] md:w-[450px] w-[350px] mt-[10px]">
                        {articles.map((article)=>{
                            return(
                                <div key={article._id} className='px-4 py-4 rounded'>
                                    <Image src={article.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
                                    <h2 className='text-2xl text-gray-800 font-medium mt-[15px] mb-[15px]'>{article.title}</h2>
                                    <div className="custom" dangerouslySetInnerHTML={{ __html: extractFirst50Words(article.content) }} ></div>...
                                    <div className='justify-between flex mt-[10px] place-items-center'><p className='text-green-600 hover:cursor-pointer hover:underline text-sm'>Share</p><Link href={`/post/${article._id}`} className='float-right text-orange-500 mt-[10px] hover:cursor-pointer hover:underline text-sm'>Read More</Link></div>
                              </div>
                            )
                        })}
                    </div>
                 
                ):(<p className='text-center text-2xl font-medium mt-[15px] text-gray-600'>Loading...</p>) }
         
        </div>
    )
}

export default TechTrends;