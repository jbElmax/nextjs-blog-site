'use client'
import Link from 'next/link';
import { useUser } from '../context/user.context';
import {fetchAllPostOfUser} from '../utils/api';
import { useEffect,useState } from 'react';
import Image from 'next/image'
interface Blog {
    _id: string;
    title: string;
    introduction: string;
    image:string;
  }
const Dashboard = ()=>{
    const {user} = useUser();
    console.log(user);
    const [postBlogs, setPostBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        const fetchData = async()=>{
          const data = await fetchAllPostOfUser(user._id);
          setPostBlogs(data ?? []);
        };
    
        fetchData();
    
      },[user._id])
    return(
        <div className='lg:mt-[0px] mt-[310px] px-2'>
        <div className='flex justify-between text-gray-700'>
            <h1 className='text-xl font-medium'>Dashboard</h1><p>Welcome back <span  className='font-medium'>{user.username}!</span></p>
        </div>
        <div className='flex flex-col'>
            
            <div><Link href={'/new-post'} className='rounded border border-gray-400 text-gray-800 bg-orange-300 px-2 py-2 float-right mt-[15px] hover:bg-orange-400'>Create Post</Link></div>
            <div>
            <h2 className='text-gray-700 text-lg mt-[10px] font-medium'>Your Post</h2>
                {postBlogs.length > 0 ? (
                    
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mx-auto'>
                    {postBlogs.map((blog) => (
                        <div key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded'>
                        <Image src={blog.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
                        <h2 className='text-2xl text-gray-800 font-medium mt-[5px]'>{blog.title}</h2>
                        
                        <div className='justify-between flex mt-[10px] place-items-center'><p className='text-red-500 hover:cursor-pointer hover:underline'>Delete</p><Link href={`/post/${blog._id}`} className='float-right text-green-600 mt-[10px] hover:cursor-pointer hover:underline'>Edit</Link></div>
                        </div>
                    ))}
                    </div>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            </div>
        </div>
        </div>
    )

}

export default Dashboard;