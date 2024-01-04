'use client'
import { useParams } from "next/navigation";
import { useState,useEffect,FormEvent } from "react";
import { fetchPostDetail,fetchCategories,editPost } from "@/app/utils/api";
import { useUser } from "../../context/user.context";
import { useRouter } from 'next/navigation';
import RichTextEditor from "../../components/rich-text-editor/rich-text-editor.component";
import Link from "next/link";
import { PostData,Category } from "./types/editPostTypes";
import Label from "@/app/components/common-components/label/label.component";
import Input from "@/app/components/common-components/input/input.component";
import Button from "@/app/components/common-components/button/button.component";

const EditPost = ()=>{
    const params = useParams();
    const postId = params.postId;
    const[postData,setPostData] = useState<PostData | null >(null);
    const [categories,setCategories] = useState<Category[]>([]);

    const {push} = useRouter();
    const {user} = useUser();
    useEffect(()=>{
        const fetchBlogDetails = async()=>{
            const response = await fetchPostDetail(postId);
            setPostData(response.data);
        }

        fetchBlogDetails();
        const fetchCategoryData = async()=>{
            const response = await fetchCategories();

            setCategories(response.data)
        }

        fetchCategoryData();
    },[postId])
    const handleContentChange = (newContent:string)=>{
        setPostData((prevData) => ({
            ...prevData,
            title: prevData?.title || '',
            content: newContent,
            image: prevData?.image || '',
            tags: prevData?.tags || [],
            category: prevData?.category || { _id: '', categoryName: '' },
            author: prevData?.author || { _id: '', username: '' },
            isFeatured: prevData?.isFeatured || false, // Provide a default value for isFeatured
          }));
    }


    const author = user?._id;
    if(!author){
        push('/dashboard');
    }
    const onSubmitHandler = async(e:FormEvent)=>{
        e.preventDefault();

        try {
            const response = await editPost(postId,postData)
      
          if (response.status === 200) {

            alert('Blog post updated successfully!');
            push('/dashboard');
          } else {

            console.error('Failed to update blog post');
          }
        } catch (error) {
          console.error('Error updating blog post:', error);
        }

    }
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostData((prevData) => ({
          ...prevData,
          title: e.target.value,
          content: prevData?.content || '',
          image: prevData?.image || '',
          tags: prevData?.tags || [],
          category: prevData?.category || { _id: '', categoryName: '' },
          author: prevData?.author || { _id: '', username: '' },
          isFeatured: prevData?.isFeatured || false, // Provide a default value for isFeatured
        }));
      };
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostData((prevData) => ({ 
            ...prevData,
            title: prevData?.title || '',
            content: prevData?.content || '',
            image: e.target.value,
            tags: prevData?.tags || [],
            category: prevData?.category || { _id: '', categoryName: '' },
            author: prevData?.author || { _id: '', username: '' },
            isFeatured: prevData?.isFeatured || false, }));
      };
      const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = e.target.value;
        const selectedCategory = categories.find((category) => category._id === selectedCategoryId);
      
        setPostData((prevData) => ({
          ...prevData,
          title: prevData?.title || '',
          content: prevData?.content || '',
          image: prevData?.image || '',
          tags: prevData?.tags || [],
          category: selectedCategory || { _id: '', categoryName: '' }, // Provide a default value for category
          author: prevData?.author || { _id: '', username: '' },
          isFeatured: prevData?.isFeatured || false,
        }));
      };

      const handleCheckboxChange = () => {
        setPostData((prevData) => ({ 
            ...prevData,
            title: prevData?.title || '',
            content: prevData?.content || '',
            image: prevData?.image || '',
            tags: prevData?.tags || [],
            category: prevData?.category || { _id: '', categoryName: '' },
            author: prevData?.author || { _id: '', username: '' }, 
            isFeatured: !prevData?.isFeatured }));
      };
      const handleTagstrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Assuming tags are comma-separated, you can split them into an array
        const tagArray = e.target.value.split(',').map((tag) => tag.trim());
        
        // Assuming your tags have an _id and name property
        const tagObjects = tagArray.map((tag, index) => ({ _id: index.toString(), name: tag }));
    
        setPostData((prevData) => ({ 
            ...prevData,
            title: prevData?.title || '',
            content: prevData?.content || '',
            image: prevData?.image || '',
            category: prevData?.category || { _id: '', categoryName: '' },
            author: prevData?.author || { _id: '', username: '' }, 
            isFeatured: prevData?.isFeatured || false,
            tags: tagObjects }));
      };
    const concatenatedTags = postData?.tags.map((tag) => tag.name).join(', ');
    return(
        <form onSubmit={onSubmitHandler}>
        <div className="mx-auto flex flex-col lg:w-[700px] w-[350px] lg:mt-[0px] mt-[320px] mb-[20px]">
            <div className="flex hover:underline decoration-green-500 hover:cursor-pointer gap-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <Link href = "/dashboard" className="text-green-600"> Back</Link>
            </div>
            <h1 className="text-lg font-medium text-gray-700 text-center">Edit Blog Post</h1>
            <Label htmlFor="title" cls="" text="Title"/>
            <Input
                onChangeHandler={handleTitleChange}
                value={postData?.title}
                id='title'
                name='title'
                type="text"
                cls="border-gray-300 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"
                />
            <Label htmlFor="" cls="mt-[10px]" text="Content"/>
            <div className="mt-[10px]">
                {postData ? (
                    <RichTextEditor value={postData?.content} onChange={handleContentChange}/>
                ):(
                    <RichTextEditor value='' onChange={handleContentChange}/>
                )}
            
            </div>
            <Label htmlFor="image" cls="lg:mt-[40px] mt-[80px]" text="Image URL"/>
            {postData ? (
                <Input onChangeHandler={handleImageChange} id='image' name ='image' type="text" cls="border-gray-300 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]" value={postData.image}/>
            ):('no image')}
            
            
            <Label htmlFor="category" cls="mt-[10px]" text="Category"/>
            <select id='category' name='category' className="border-2 border-gray-300 rounded mt-[10px] px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300" 
            value={postData?.category._id || ''} onChange={handleCategoryChange}>
                {categories.length > 0 ? (
                    categories.map((category)=>{
                        return(<option key={category._id} value={category._id}>{category.categoryName}</option>)
                    })
                ):('')

                }
            </select>

            <div className="mt-[10px]">
                <Label htmlFor="chk" cls="" text="Is Featured?"/>
                {postData ? (
                    <input onChange={handleCheckboxChange} id='chk' type="checkbox" className="ml-[10px]" checked={postData?.isFeatured}/>
                ):(
                    <input onChange={handleCheckboxChange} id='chk' type="checkbox" className="ml-[10px]" checked={false}/>
                )}
                
            </div>
            <Label htmlFor="tagstr"  cls="mt-[10px]" text="Tags"/>
            <Input onChangeHandler={handleTagstrChange} id='tagstr' name='tagstr' value={concatenatedTags} type="text" placeholder="Enter tags separated by commas" cls="border-gray-300 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
            <Button type="submit" cls="border-orange-300 bg-orange-400 mt-[20px] hover:bg-orange-500" label="Publish"/>
        </div>

    </form>
    )
}

export default EditPost;