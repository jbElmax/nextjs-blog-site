'use client'
import Image from 'next/image'
import { useEffect,useState } from 'react';
import {fetchFeaturedBlog} from './utils/api';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  introduction: string;
  image:string;
}
const Home = ()=> {
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);

  useEffect(()=>{
    const fetchData = async()=>{
      const data = await fetchFeaturedBlog();
      setFeaturedBlogs(data ?? []);
    };

    fetchData();

  },[])
  return (
    <div>
      <h1 className='text-center text-2xl mt-[20px] text-gray-700'>Featured Post</h1>

      {featuredBlogs.length > 0 ? (
        <div className='grid grid-cols-3 ml-[100px]'>
          {featuredBlogs.map((blog) => (
            <div key={blog._id} className='w-[400px] px-4 py-4 shadow-lg rounded'>
              <Image src={blog.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
              <h2 className='text-2xl text-gray-800 font-medium'>{blog.title}</h2>
              <p className='text-gray-700 mt-[5px] text-justify text-base'>{blog.introduction}</p>
              <Link href={`/post/${blog._id}`} className='underline place-items-end text-blue-500 mt-[10px] hover:cursor-pointer'>Read More</Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
export default Home;
