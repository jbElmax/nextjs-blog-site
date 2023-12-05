'use client'
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import { fetchPostDetail } from "@/app/utils/api";
import Image from "next/image";
import Link from "next/link";
import 'react-quill/dist/quill.snow.css';
interface Tag{
    _id:string;
    name:string;
}
interface Author{
    _id:string;
    username:string;
}
interface DetailedPost {
    _id:string;
    title:string;
    content:string;
    image:string;
    author:Author;
    createdAt:string;
    tags:Tag[]
}
function formatDateString(dateString: string): string {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US');
    return formattedDate;
  }
const PostDetail = ()=>{
    const params = useParams();
    const postId = params.postId;
    const[blogPost,setBlogPost] = useState<DetailedPost | null>(null);


    useEffect(()=>{
        const fetchBlogDetails = async()=>{
            const data = await fetchPostDetail(postId);
            setBlogPost(data);
        }

        fetchBlogDetails();
    },[postId])
    return(

        <div className="lg:mx-auto p-2 place-items-center lg:w-[550px] w-[350px] mt-[30px] pb-[10px]">
            
            {blogPost && (
                <div className="px-1 py-1">
                    <div className="flex hover:underline decoration-green-500 hover:cursor-pointer gap-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        <Link href = "/" className="text-green-600"> Back</Link>
                    </div>
                    
                    <Image src = {blogPost.image} alt="post image" width={350} height={200} className="w-full h-[200px] object-cover rounded mt-[15px]"/>
                    <div className="flex lg:flex-row flex-col justify-between mt-[10px]"><p className="text-sm text-gray-600 mt-[5px]">Author:{blogPost.author.username}</p><p className="text-sm mt-[5px] text-gray-600">Publish At:  {formatDateString(blogPost.createdAt)}</p></div>
                    <ul className="flex flex-row text-sm text-gray-600 mt-[3px]">Tags:
                        {blogPost.tags.map((tag) => (
                        <li key={tag._id}>{tag.name}</li>
                        ))}
                    </ul>
                    <h1 className="text-2xl text-center font-medium text-gray-800 mt-[15px]">{blogPost.title}</h1>

                    <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                    <div className="flex place-items-center justify-between"><p className="text-green-500 hover:cursor-pointer hover:underline">Share</p><p className="float-right text-orange-500 mt-[10px] mb-[10px] hover:cursor-pointer hover:underline">Post a comment</p></div>
                </div>
            )}
            
        </div>
    )
}

export default PostDetail;