'use client'
import { useParams } from "next/navigation";
import { useEffect,useState } from "react";
import { fetchPostDetail, saveCommentOnPost } from "@/app/utils/api";
import 'react-quill/dist/quill.snow.css';
import { useUser } from "../../context/user.context";
import Post from "@/app/components/post/post.component";
import { DetailedPost } from "@/app/components/post/types/interface";

const PostDetail = ()=>{
    const params = useParams();
    const postId = params.postId;
    const[blogPost,setBlogPost] = useState<DetailedPost | null>(null);
    const[comment,setComment] = useState('');
    const[isCommenting,setIsCommenting] = useState(false);
    const[isLoading,setIsLoading] = useState(true);
    const {user} = useUser();
    
    const onClickCommentHandler = ()=>{
        setIsCommenting(!isCommenting);
    }

    const onClickSubmitHandler = async()=>{
        try{
            const userId = user?._id;
            if(!userId){
                alert("Login in first to add a comment");
                return
            }
            const response =await saveCommentOnPost(postId,userId,comment)

            if(response.status === 200){
                console.log(response.status);
                alert('Comment successfully saved');
            }else{
                alert('Unable to add comment this time');
            }
            
            
            setComment('');
            setIsCommenting(false);
            await fetchBlogDetails();
        }catch(error){
            console.log(error);
        }

    }
    const fetchBlogDetails = async()=>{
        const response = await fetchPostDetail(postId);
        setBlogPost(response.data);
        setIsLoading(false)
    }
    useEffect(()=>{

        fetchBlogDetails();
        
    },[])
    
    return(
        <Post
            blogPost={blogPost}
            isLoading={isLoading}
            onClickCommentHandler={onClickCommentHandler}
            comment={comment}
            setComment={setComment}
            isCommenting={isCommenting}
            onClickSubmitHandler={onClickSubmitHandler}
        />
    )
}

export default PostDetail;