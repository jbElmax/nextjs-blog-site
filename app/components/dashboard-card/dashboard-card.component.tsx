
import Image from "next/image";
import { extractFirst40Words } from "@/app/helpers/extractFirst40Words";
import Link from 'next/link';

interface CardProps{
    blog:{
        _id:string;
        image:string;
        title:string;
    };
    className:string;
    deletePost:(postId:string)=>void;
}

const DashboardCard:React.FC<CardProps> = ({className, blog, deletePost})=>{
    return(
        <div key={blog._id} className={className}>
        <Image src={blog.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
        <h2 className='text-2xl text-gray-800 font-medium mt-[15px]'>{blog.title}</h2>
        
        <div className='justify-between flex mt-[10px] place-items-center'><p className='text-red-500 hover:cursor-pointer hover:underline' onClick={()=>deletePost(blog._id)}>Delete</p><Link href={`/edit-post/${blog._id}`} className='float-right text-green-600 mt-[10px] hover:cursor-pointer hover:underline'>Edit</Link></div>
    </div>
    )
}

export default DashboardCard;