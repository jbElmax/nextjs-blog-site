'use client'
import { useState,useEffect } from "react";
import {fetchFeaturedBlog } from "../utils/api";
import Card from "../components/card/card.component";
interface Blog {
    _id: string;
    title: string;
    content: string;
    image:string;
  }
const Articles = ()=>{
    const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
    const extractFirst50Words = (content:string) => {
        const words = content.split(' ');
        const first40Words = words.slice(0, 40).join(' ');
        return first40Words;
      };

    useEffect(()=>{
        const fetchData = async()=>{
          const response = await fetchFeaturedBlog();
          setFeaturedBlogs(response.data ?? []);
        };
    
        fetchData();
    
      },[])
    return(
        <div>
            <h1 className="text-2xl font-medium text-center text-gray-700">Featured Articles</h1>
            
                {featuredBlogs.length > 0 ?(
                    <div className="grid grid-cols-1 mx-auto lg:w-[650px] md:w-[450px] w-[350px] mt-[10px]">
                        {featuredBlogs.map((blog)=>{
                            return(
                            <Card key={blog._id} className="px-4 py-4 rounded" _id={blog._id} image={blog.image} title={blog.title} content={blog.content}/>
                            )
                        })}
                    </div>
                 
                ):(<p className='text-center text-2xl font-medium mt-[15px] text-gray-600'>Loading...</p>) }
         
        </div>
    )
}

export default Articles;