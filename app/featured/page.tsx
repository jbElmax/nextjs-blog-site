'use client'
import { useState,useEffect } from "react";
import {fetchFeaturedBlog } from "../utils/api";
import Image from "next/image";
import Link from "next/link";
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
          const data = await fetchFeaturedBlog();
          setFeaturedBlogs(data ?? []);
        };
    
        fetchData();
    
      },[])
    return(
        <div>
            <h1 className="text-2xl font-medium text-center text-gray-700">Articles</h1>
            
                {featuredBlogs.length > 0 ?(
                    <div className="grid grid-cols-1 mx-auto lg:w-[650px] md:w-[450px] w-[350px] mt-[10px]">
                        {featuredBlogs.map((blog)=>{
                            return(
                                <div key={blog._id} className='px-4 py-4 rounded'>
                                    <Image src={blog.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
                                    <h2 className='text-2xl text-gray-800 font-medium mt-[15px] mb-[15px]'>{blog.title}</h2>
                                    <div className="custom" dangerouslySetInnerHTML={{ __html: extractFirst50Words(blog.content) }} ></div>...
                                    <div className='justify-between flex mt-[10px] place-items-center'><p className='text-green-600 hover:cursor-pointer hover:underline text-sm'>Share</p><Link href={`/post/${blog._id}`} className='float-right text-orange-500 mt-[10px] hover:cursor-pointer hover:underline text-sm'>Read More</Link></div>
                              </div>
                            )
                        })}
                    </div>
                 
                ):(<p className='text-center text-2xl font-medium mt-[15px] text-gray-600'>Loading...</p>) }
         
        </div>
    )
}

export default Articles;