import Image from "next/image";
import { extractFirst40Words } from "@/app/helpers/extractFirst40Words";
import Link from 'next/link';
import { BlogType } from "./type/type";

interface CardProps extends BlogType{
    className?:string
}

const Card:React.FC<CardProps> = ({className, ...blogProp})=>{
    return(
        <div key={blogProp._id} className={className}>
            <Image src={blogProp.image} alt='post image' width={450} height={200} className='w-full h-[200px] object-cover rounded'/>
            <h2 className='text-2xl text-gray-800 font-medium mt-[15px] mb-[15px]'>{blogProp.title}</h2>
            {blogProp.content?.length > 0 ? 
                (
                <div className="custom" dangerouslySetInnerHTML={{ __html: extractFirst40Words(blogProp.content) }} ></div>
                ):(<p></p>) 
            }
            
            <div className='justify-between flex mt-[10px] place-items-center'><p className='text-green-600 hover:cursor-pointer hover:underline text-sm'>Share</p><Link href={`/post/${blogProp._id}`} className='float-right text-orange-500 mt-[10px] hover:cursor-pointer hover:underline text-sm'>Read More</Link></div>
        </div>
    )
}

export default Card;