'use client'
import { useEffect,useState,FormEvent } from "react";
import { fetchCategories,createPost } from "../utils/api";
import { useUser } from "../context/user.context";
import { useRouter } from 'next/navigation';
//import CreatePost from "../components/create-post/create-post.component";
import dynamic from "next/dynamic";

const ClientSideComponent = dynamic(()=> import("../components/create-post/create-post.component"),{ssr:false})

let DOMPurify: typeof import('isomorphic-dompurify');
if (typeof window !== 'undefined') {
  DOMPurify = require('isomorphic-dompurify');
}
const defaultFormValue = {
    title:'',
    content:'',
    image:'',
    tagstr:'',
    category:''
}
export interface Category {
    _id:string;
    categoryName:string
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

    const author = user?._id;
    // if(!author){
    //     push('/dashboard');
    // }
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
        console.log(category);
        try{
            const sanitizeContent = DOMPurify.sanitize(content);
            //const sanitizeContent = content;
            const postData = {title,content:sanitizeContent,image,author,category,tags,isFeatured};
            const response = await createPost(postData,user.token)
            if(!category || category ===''){
                alert('Please select Category');
                return
            }

            if(response.status == 200){
                alert('Post successfully created');
                push('/dashboard');
            }else{
                alert('Unable to create post this time');
            }
            
            
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
            const response = await fetchCategories();

            setCategories(response.data)
        }

        fetchCategoryData();
    },[])
    return(
        //    <CreatePost 
        //     onChangeHandler={onChangeHandler}
        //     onSubmitHandler={onSubmitHandler}
        //     content = {content}
        //     handleContentChange = {handleContentChange}
        //     categories={categories}
        //     isChecked={isChecked}
        //     handleCheckboxChange={handleCheckboxChange}
        //     formFields={formFields}
        //    />
        <ClientSideComponent 
            onChangeHandler={onChangeHandler}
            onSubmitHandler={onSubmitHandler}
            content = {content}
            handleContentChange = {handleContentChange}
            categories={categories}
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
            formFields={formFields}
        />

    )
        
}

export default NewPost;