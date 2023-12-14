'use client'
import { useEffect,useState,FormEvent } from "react";
import { fetchCategories } from "../utils/api";
import { useUser } from "../context/user.context";
import { useRouter } from 'next/navigation';
import RichTextEditor from "../components/rich-text-editor/rich-text-editor.component";
import Link from "next/link";
interface Category {
    _id:string;
    categoryName:string
}
const defaultFormValue = {
    title:'',
    content:'',
    image:'',
    tagstr:'',
    category:''

}
const NewPost = ()=>{
    const [categories,setCategories] = useState<Category[]>([]);
    const [formFields,setFormFields] = useState(defaultFormValue);
    const [isChecked, setIsChecked] = useState(false);
    const [content,setContent] = useState('');
    const {title,image,tagstr,category} = formFields;
    const {push} = useRouter();
    const {user} = useUser();
    
    const handleContentChange = (value:string)=>{
        setContent(value);
    }

    if(!user){
        push('/dashboard');
    }
    const author = user._id;
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const {name,value} = e.target;

        setFormFields({...formFields,[name]:value});

    }
    const resetFormFields = () => {
        setFormFields(defaultFormValue);
    }
    const onSubmitHandler = async(e:FormEvent)=>{
        e.preventDefault();
        const tags = tagstr.split(',').map(tag=>tag.trim());
        const isFeatured = isChecked;

        try{
            const response =await fetch('http://localhost:8000/api/blog/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title,content,image,author,category,tags,isFeatured }),
            })
            if(!response.ok){
                if(response.status === 400){
                    alert(await response.json());
                }else{
                    alert('Unable to register user this time.')
                }
                
                
                return;
            }
            
            alert('Post successfully created');
            resetFormFields();

        }catch(error){
            console.log(error);
        }
    }
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checked status
      };
    useEffect(()=>{
        const fetchCategoryData = async()=>{
            const data = await fetchCategories();

            setCategories(data)
        }

        fetchCategoryData();
    },[])
    return(
           
            <form onSubmit={onSubmitHandler}>
                <div className="mx-auto flex flex-col lg:w-[700px] w-[350px] lg:mt-[0px] mt-[320px] mb-[20px]">
                    <div className="flex hover:underline decoration-green-500 hover:cursor-pointer gap-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        <Link href = "/dashboard" className="text-green-600"> Back</Link>
                    </div>
                    <h1 className="text-lg font-medium text-gray-700 text-center">Create a New Post</h1>
                    <label>Title</label>
                    <input onChange={onChangeHandler} name='title' type="text" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
                    <label className="mt-[10px]">Content</label>
                    <div className="mt-[10px]">
                    <RichTextEditor value={content} onChange={handleContentChange}/>
                    </div>
                    <label className="lg:mt-[40px] mt-[80px]">Image URL</label>
                    <input onChange={onChangeHandler} name ='image' type="text" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
                    
                    <label className="mt-[10px]">Category</label>
                    <select onChange={onChangeHandler} name='category' className="border-2 border-gray-300 rounded mt-[10px] px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300">
                        {categories.length > 0 ? (
                            categories.map((category)=>{
                                return(<option key={category._id} value={category._id}>{category.categoryName}</option>)
                            })
                        ):('')

                        }
                    </select>

                    <div className="mt-[10px]">
                        <label>Is Featured?</label>
                        <input onChange={handleCheckboxChange} type="checkbox" className="ml-[10px]" checked={isChecked}/>
                    </div>
                    <label className="mt-[10px]">Tags</label>
                    <input onChange={onChangeHandler} name='tagstr' type="text" placeholder="Enter tags separated by commas" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
                    <button type="submit" className="border text-white border-orange-300 px-2 py-2 bg-orange-400 mt-[20px] rounded hover:bg-orange-500">Publish</button>
                </div>
    
            </form>
        
            )
        
}

export default NewPost;