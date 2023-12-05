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
      <h1 className='text-center text-2xl font-medium mt-[20px] md:mt-[300px] lg:mt-[20px] text-gray-700'>Featured Post</h1>

      {featuredBlogs.length > 0 ? (
        <div className='grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4 mx-auto mt-[10px]'>
          {featuredBlogs.map((blog) => (
            <div key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded'>
              <Image src={blog.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
              <h2 className='text-2xl text-gray-800 font-medium mt-[5px]'>{blog.title}</h2>
              {/* <p className='text-gray-700 mt-[5px] text-justify text-base'>{blog.introduction}</p> */}
              <div className='justify-between flex mt-[10px] place-items-center'><p className='text-green-600 hover:cursor-pointer hover:underline text-sm'>Share</p><Link href={`/post/${blog._id}`} className='float-right text-orange-500 mt-[10px] hover:cursor-pointer hover:underline text-sm'>Read More</Link></div>
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
