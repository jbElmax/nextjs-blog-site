'use client'
import Link from 'next/link';
import { useUser } from '../context/user.context';
import {fetchAllPostOfUser} from '../utils/api';
import { useEffect,useState } from 'react';
import DashboardCard from '../components/dashboard-card/dashboard-card.component';
import { useRouter } from 'next/navigation';

interface Blog {
    _id: string;
    title: string;
    introduction: string;
    image:string;
  }

const Dashboard = ()=>{
    const {push} = useRouter();
    const {user} = useUser();

    const [postBlogs, setPostBlogs] = useState<Blog[]>([]);

    const fetchData = async()=>{
        const userId = user?._id;
        if(!userId){
            push('/auth')
        }
        const data = await fetchAllPostOfUser(user._id);
  
        setPostBlogs(data.data ?? []);
      };

    useEffect(()=>{

        fetchData();
    
      },[])

    const deletePost = async(postId:string) =>{
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
                <h1 className='text-xl font-medium'>Dashboard</h1><p>Welcome back <span  className='font-medium'>{user?.username}!</span></p>
            </div>
              
            <div><Link href={'/new-post'} className='rounded border border-orange-400 text-gray-800 px-2 py-2 float-right mt-[15px] hover:bg-orange-200'>Create Post</Link></div>
      
            <div className='mt-[40px]'>
                <h2 className='text-gray-700 text-lg mt-[10px] font-medium'>Your Post</h2>
                {postBlogs.length > 0 ? (
                    
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 place-items-center'>
                    {postBlogs.map((blog) => (
                        <DashboardCard key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded' blog={blog} deletePost={deletePost}/>
                    ))}
                    </div>
                    ) : (
                        <p className='text-center text-2xl font-medium mt-[15px] text-gray-600'>Loading...</p>
                    )
                }
            </div>

        </div>
    )

}

export default Dashboard;