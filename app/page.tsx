'use client'
import Image from 'next/image'
import { useEffect,useState } from 'react';
import {fetchAllPost} from './utils/api';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image:string;
}
const Home = ()=> {
  const [allPost, setAllPost] = useState<Blog[]>([]);
  const extractFirst50Words = (content:string) => {
    const words = content.split(' ');
    const first40Words = words.slice(0, 40).join(' ');
    return first40Words;
  };
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await fetchAllPost();
      setAllPost(data ?? []);
    };

    fetchData();

  },[])
  return (
    <div>
      <h1 className='text-center text-2xl font-medium mt-[20px] md:mt-[300px] lg:mt-[25px] text-gray-700'>All Articles</h1>

      {allPost.length > 0 ? (
        <div className='grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4 mx-auto mt-[10px]'>
          {allPost.map((blog) => (
            <div key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded'>
              <Image src={blog.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
              <h2 className='text-2xl text-gray-800 font-medium mt-[15px] mb-[15px]'>{blog.title}</h2>
              <div className="custom" dangerouslySetInnerHTML={{ __html: extractFirst50Words(blog.content) }} ></div>...
              <div className='justify-between flex mt-[10px] place-items-center'><p className='text-green-600 hover:cursor-pointer hover:underline text-sm'>Share</p><Link href={`/post/${blog._id}`} className='float-right text-orange-500 mt-[10px] hover:cursor-pointer hover:underline text-sm'>Read More</Link></div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-center text-2xl font-medium mt-[15px] text-gray-600'>Loading...</p>
      )}
    </div>
  )
}
export default Home;
