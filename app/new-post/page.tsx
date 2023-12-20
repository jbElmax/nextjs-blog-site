'use client'
import { useEffect,useState,FormEvent } from "react";
import { fetchCategories,createPost } from "../utils/api";
import { useUser } from "../context/user.context";
import { useRouter } from 'next/navigation';
import CreatePost from "../components/create-post/create-post.component";
import { Category } from "./types/newPostTypes";

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

    const author = user?._id;
    if(!author){
        push('/dashboard');
    }
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
            const response = await createPost(title,content,image,author,category,tags,isFeatured)
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
           
            <CreatePost
                onSubmitHandler={onSubmitHandler}
                onChangeHandler={onChangeHandler}
                content={content}
                handleContentChange={handleContentChange}
                categories={categories}
                isChecked={isChecked}
                handleCheckboxChange={handleCheckboxChange}
            />
    )
        
}

export default NewPost;