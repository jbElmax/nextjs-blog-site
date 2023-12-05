'use client'
import { useParams } from "next/navigation";
import { useState,useEffect,FormEvent } from "react";
import { fetchPostDetail,fetchCategories } from "@/app/utils/api";
import { useUser } from "../../context/user.context";
import { useRouter } from 'next/navigation';
import RichTextEditor from "../../components/rich-text-editor/rich-text-editor.component";
import Link from "next/link";
interface Tag{
    _id:string;
    name:string;
}
interface Author{
    _id:string;
    username:string;
}
interface Category{
    _id:string;
    categoryName:string;
}
interface PostData {
    title:string;
    content:string;
    image:string;
    tags:Tag[];
    category:Category;
    author:Author,
    isFeatured:boolean
}

const EditPost = ()=>{
    const params = useParams();
    const postId = params.postId;
    const[postData,setPostData] = useState<PostData | null >(null);
    const [categories,setCategories] = useState<Category[]>([]);

    const {push} = useRouter();
    const {user} = useUser();
    useEffect(()=>{
        const fetchBlogDetails = async()=>{
            const data = await fetchPostDetail(postId);
            setPostData(data);
        }

        fetchBlogDetails();
        const fetchCategoryData = async()=>{
            const data = await fetchCategories();

            setCategories(data)
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

    if(!user){
        push('/dashboard');
    }
    const author = user._id;

    const onSubmitHandler = async(e:FormEvent)=>{
        e.preventDefault();

        // Assuming you have an API endpoint to update a blog post
        const updatePostEndpoint = `http://localhost:8000/api/blog/${postId}`;
      
        try {
          const response = await fetch(updatePostEndpoint, {
            method: 'PUT', // or 'PATCH' depending on your API
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers you need, e.g., authorization
            },
            body: JSON.stringify(postData),
          });
      
          if (response.ok) {
            // The update was successful, you may want to redirect to the updated post or another page
            alert('Blog post updated successfully!');
            push('/dashboard');
          } else {
            // Handle the case where the update was not successful
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
            <label>Title</label>
            <input
                onChange={handleTitleChange}
                value={postData?.title}
                name='title'
                type="text"
                className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"
                />
            <label className="mt-[10px]">Content</label>
            <div className="mt-[10px]">
                {postData ? (
                    <RichTextEditor value={postData?.content} onChange={handleContentChange}/>
                ):(
                    <RichTextEditor value='' onChange={handleContentChange}/>
                )}
            
            </div>
            <label className="lg:mt-[40px] mt-[80px]">Image URL</label>
            {postData ? (
                <input onChange={handleImageChange} name ='image' type="text" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]" value={postData.image}/>
            ):('no image')}
            
            
            <label className="mt-[10px]">Category</label>
            <select name='category' className="border-2 border-gray-300 rounded mt-[10px] px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300" 
            value={postData?.category._id || ''} onChange={handleCategoryChange}>
                {categories.length > 0 ? (
                    categories.map((category)=>{
                        return(<option key={category._id} value={category._id}>{category.categoryName}</option>)
                    })
                ):('')

                }
            </select>

            <div className="mt-[10px]">
                <label>Is Featured?</label>
                {postData ? (
                    <input onChange={handleCheckboxChange} type="checkbox" className="ml-[10px]" checked={postData?.isFeatured}/>
                ):(
                    <input onChange={handleCheckboxChange} type="checkbox" className="ml-[10px]" checked={false}/>
                )}
                
            </div>
            <label className="mt-[10px]">Tags</label>
            <input onChange={handleTagstrChange} name='tagstr' value={concatenatedTags} type="text" placeholder="Enter tags separated by commas" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
            <button type="submit" className="border border-orange-300 px-2 py-2 bg-orange-400 mt-[20px] rounded hover:bg-orange-500">Publish</button>
        </div>

    </form>
    )
}

export default EditPost;