'use client'
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import { fetchPostDetail } from "@/app/utils/api";
import Image from "next/image";

interface Author{
    _id:string;
    username:string;
}
interface DetailedPost {
    _id:string;
    title:string;
    content:string;
    conclusion:string;
    introduction:string;
    image:string;
    author:Author;
    createdAt:string;
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

        <div className="lg:mx-auto p-2 place-items-center lg:w-[550px] w-[350px] mt-[30px]">
            {blogPost && (
                <div className="px-1 py-1">
                    <Image src = {blogPost.image} alt="post image" width={350} height={200} className="w-full h-[200px] object-cover rounded"/>
                    <div className="flex lg:flex-row flex-col justify-between mt-[10px]"><p className="text-sm text-gray-600 mt-[5px]">Author:{blogPost.author.username}</p><p className="text-sm mt-[5px] text-gray-600">Publish At:  {blogPost.createdAt}</p></div>
                    <h1 className="text-2xl text-center font-medium text-gray-800 mt-[15px]">{blogPost.title}</h1>

                    <h2 className="text-lg mt-[20px] font-medium">Introduction</h2>
                    <p className="mt-[5px] text-justify">{blogPost.introduction}</p>
                    <h2 className="text-lg mt-[10px] font-medium">Body</h2>
                    <p className="mt-[10px] text-justify">{blogPost.content}</p>
                    <h2 className="text-lg mt-[10px] font-medium">Conclusion</h2>
                    <p className="text-justify mt-[5px]">{blogPost.conclusion}</p>
                </div>
            )}
            
        </div>
    )
}

export default PostDetail;