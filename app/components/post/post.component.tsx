import Loading from "../loading/loading";
import Image from "next/image";
import Link from "next/link";
import { DetailedPost } from "./types/interface";
import {formatDateString} from "../../utils/helper"
import FbShareButton from "../fb-share-button/fb.share.button.component";


interface PostProps {
    blogPost: DetailedPost | null;
    isLoading: boolean;
    onClickCommentHandler: () => void;
    comment: string;
    setComment: React.Dispatch<React.SetStateAction<string>>;
    isCommenting: boolean;
    onClickSubmitHandler: () => void;
  }

const Post:React.FC<PostProps> = ({isLoading,blogPost,isCommenting,comment,onClickCommentHandler,onClickSubmitHandler,setComment})=>{
    return(
        <div className="lg:mx-auto mx-auto p-2 place-items-center lg:w-[550px] w-[350px] mt-[30px] pb-[10px]">
        {!isLoading ? 
        (
            <>
                {blogPost &&(
                    <div className="px-1 py-1">
                        <div className="flex hover:underline decoration-green-500 hover:cursor-pointer gap-x-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            <Link href = "/" className="text-green-600"> Back</Link>
                        </div>
                        
                        <Image src = {blogPost.image} alt="post image" width={350} height={200} className="w-full h-[200px] object-cover rounded mt-[20px]"/>
                        <div className="flex lg:flex-row flex-col justify-between mt-[10px]"><p className="text-sm text-gray-600 mt-[5px]">Author:{blogPost.author.username}</p><p className="text-sm mt-[5px] text-gray-600">Publish At:  {formatDateString(blogPost.createdAt)}</p></div>
                        <ul className="flex flex-row text-sm text-gray-600 mt-[3px]">Tags:
                            {blogPost.tags.map((tag) => (
                            <li key={tag._id}>{tag.name}</li>
                            ))}
                        </ul>
                        <h1 className="text-2xl text-center font-medium text-gray-800 mt-[15px] mb-[15px]">{blogPost.title}</h1>

                        <div className="custom" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                        <div className="flex place-items-center justify-between mt-[20px]"><div className="flex"><p className="text-green-500 mr-[5px]">Share</p><FbShareButton postId={blogPost._id}/></div><p className="float-right text-orange-500 mt-[10px] mb-[10px] hover:cursor-pointer hover:underline" onClick={onClickCommentHandler}>Post a comment</p></div>
                        
                            {isCommenting &&(
                                <div className="flex flex-col">
                                    <textarea value={comment} rows={4} placeholder="type your comment here" className="px-2 py-2 border-2 border-gray-300 focus:outline-none focus:ring focus:ring-green-300 rounded" onChange={(e)=> setComment(e.target.value)}></textarea>
                                    <button className="px-2 py-3 border border-green-300 rounded mt-[10px] bg-orange-300 hover:bg-orange-400" onClick={onClickSubmitHandler}>Submit</button>
                                </div>
                            )}
                        <div className="flex flex-col bg-orange-100 px-3 py-3 rounded mt-[10px]">
                            <h2 className="font-medium">Comments</h2>
                            {blogPost.comments.length > 0 ? (
                                <>
                                    {blogPost.comments.map((comment)=>
                                        (<div className="flex flex-col lg:flex-row justify-between" key={comment._id}>
                                            <p className="mt-[10px]">{comment.user.username} says:</p>
                                            <p className="text-sm mt-[10px] italic">{`--${comment.comment}`}</p>
                                        </div>))}
                                </>
                            ):(
                                <p className="text-sm">No Comment yet on this post</p>
                            )}

                        </div> 

                        
                    </div>
                )}
            </>
        
        ):(<Loading />)}

        
    </div>
    )
}
export default Post;