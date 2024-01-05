'use client'
import Link from 'next/link';
import { useUser } from '../context/user.context';
import {fetchAllPostOfUser,deleteBlogPost} from '../utils/api';
import { useEffect,useState } from 'react';
import DashboardCard from '../components/dashboard-card/dashboard-card.component';
import { useRouter } from 'next/navigation';
import Loading from '../components/loading/loading';

interface Blog {
    _id: string;
    title: string;
    introduction: string;
    image:string;
  }

const Dashboard = ()=>{
    const {push} = useRouter();
    const {user,logoutUser} = useUser();

    const [postBlogs, setPostBlogs] = useState<Blog[]>([]);
    const [isLoading,setIsLoading] = useState(true);
    const userId = user?._id;
    const fetchData = async(id:string)=>{
        
        
        if(!userId){
            push('/auth')
        }
        setIsLoading(true)
        const data = await fetchAllPostOfUser(id);
  
        setPostBlogs(data.data ?? []);

        setIsLoading(false)
      };

    useEffect(()=>{
        
        fetchData(userId);
        
    },[])

    const logoutHandler = ()=>{
        logoutUser();
        push('/auth');
    }

    const deletePost = async(postId:string) =>{
        const userConfirmed = confirm("Are you sure to delete post?");
        if(userConfirmed){
            try{

                const response = await deleteBlogPost(postId,user.token)
                if(response.status === 200){
                    
                    alert('Post successfully deleted.')
                    fetchData(userId);
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
                <h1 className='text-xl font-medium'>Dashboard</h1><p>Welcome back <span  className='font-medium'>{user?.username}!</span></p><p className='text-blue-500 hover:underline hover:cursor-pointer' onClick={logoutHandler}>Logout</p>
            </div>
              
            <div><Link href={'/new-post'} className='rounded border border-orange-400 text-gray-800 px-2 py-2 float-right mt-[15px] hover:bg-orange-200'>Create Post</Link></div>
      
            <div className='mt-[40px]'>
                <h2 className='text-gray-700 text-lg mt-[10px] font-medium'>Your Post</h2>
                {isLoading ? 
                    (<Loading/>)
                    :('')
                }
                {postBlogs.length > 0 ? (
                    
                    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4 place-items-center'>
                        {postBlogs.map((blog) => (
                            <DashboardCard key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded' blog={blog} deletePost={deletePost}/>
                        ))}
                    </div>
                    ) : (
                        <p className='text-xl font-medium mt-[15px] text-gray-600'>No Post yet.</p>
                    )
                }
                
                
            </div>

        </div>
    )

}

export default Dashboard;