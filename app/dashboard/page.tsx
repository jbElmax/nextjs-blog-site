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

    const fetchData = async()=>{
        const data = await fetchAllPostOfUser(user._id);
        setPostBlogs(data ?? []);
      };

    useEffect(()=>{

        fetchData();
    
      },[])

    async function deletePost(postId:string){
        const userConfirmed = confirm("Are you sure to delete post?");
        if(userConfirmed){
            try{
                const response =await fetch(`http://localhost:8000/api/blog/${postId}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    
                })
                if(response.ok){
                    
                    alert('Post successfully deleted.')
                    fetchData();
                }else{
                    alert('Unable to delete the post.')
                }
            }catch(error){
               console.log(error); 
            }
        }
    }
    return(
        <div className='lg:mt-[0px] mt-[310px] px-2'>
        <div className='flex justify-between text-gray-700'>
            <h1 className='text-xl font-medium'>Dashboard</h1><p>Welcome back <span  className='font-medium'>{user.username}!</span></p>
        </div>
        <div className='flex flex-col'>
            
            <div><Link href={'/new-post'} className='rounded border shadow-md border-green-400 text-gray-800 px-2 py-2 float-right mt-[15px] hover:bg-orange-200'>Create Post</Link></div>
            <div>
            <h2 className='text-gray-700 text-lg mt-[10px] font-medium'>Your Post</h2>
                {postBlogs.length > 0 ? (
                    
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 mx-auto'>
                    {postBlogs.map((blog) => (
                        <div key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded'>
                        <Image src={blog.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
                        <h2 className='text-2xl text-gray-800 font-medium mt-[5px]'>{blog.title}</h2>
                        
                        <div className='justify-between flex mt-[10px] place-items-center'><p className='text-red-500 hover:cursor-pointer hover:underline' onClick={()=>deletePost(blog._id)}>Delete</p><Link href={`/edit-post/${blog._id}`} className='float-right text-green-600 mt-[10px] hover:cursor-pointer hover:underline'>Edit</Link></div>
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