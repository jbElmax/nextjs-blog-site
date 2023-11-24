'use client'
import { useEffect,useState,FormEvent } from "react";
import { fetchCategories } from "../utils/api";
import { useUser } from "../context/user.context";

interface Category {
    _id:string;
    categoryName:string
}
const defaultFormValue = {
    title:'',
    introduction:'',
    content:'',
    image:'',
    conclusion:'',
    tags:'',
    category:''

}
const NewPost = ()=>{
    const [categories,setCategories] = useState<Category[]>([]);
    const [formFields,setFormFields] = useState(defaultFormValue);
    const [isChecked, setIsChecked] = useState(false);
    const {title,introduction,content,image,conclusion,tags,category} = formFields;
    const {user} = useUser();
    const author = user._id;
    const isfeatured = isChecked;
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
        const {name,value} = e.target;

        setFormFields({...formFields,[name]:value});

    }
    const resetFormFields = () => {
        setFormFields(defaultFormValue);
    }
    const onSubmitHandler = async(e:FormEvent)=>{
        e.preventDefault();

        try{
            const response =await fetch('http://localhost:8000/api/blog/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title,introduction, content,conclusion,image,author,category,tags,isfeatured }),
            })
            if(!response.ok){
                if(response.status === 400){
                    alert(await response.json());
                }else{
                    alert('Unable to register user this time.')
                }
                
                
                return;
            }
            resetFormFields();
            alert('User successfully sign-up.');

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
            console.log(data);
            setCategories(data)
        }

        fetchCategoryData();
    },[])
    return(
           
            <form onSubmit={onSubmitHandler}>
                <div className="mx-auto flex flex-col lg:w-[600px] w-[350px] lg:mt-[0px] mt-[320px]">
                    <h1 className="text-lg font-medium text-gray-700 text-center">Create a New Post</h1>
                    <label>Title</label>
                    <input onChange={onChangeHandler} name='title' type="text" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
                    <label className="mt-[10px]">Introduction</label>
                    <textarea onChange={onChangeHandler} name='introduction' rows={4} className="border-2 border-gray-300 rounded mt-[10px] px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300"/>
                    <label className="mt-[10px]">Body Content</label>
                    <textarea onChange={onChangeHandler} name='content' rows={6} className="border-2 border-gray-300 rounded mt-[10px] px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300"/>
                    <label className="mt-[10px]">Image URL</label>
                    <input onChange={onChangeHandler} name ='image' type="text" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
                    <label className="mt-[10px]">Conclusion</label>
                    <textarea onChange={onChangeHandler} name='conclusion' rows={6} className="border-2 border-gray-300 rounded mt-[10px] px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300"/>
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
                    <input onChange={onChangeHandler} name='tags' type="text" placeholder="Enter tags separated by commas" className="border-2 border-gray-300 rounded px-2 py-2 focus:outline-none focus:ring focus:ring-orange-300 mt-[10px]"/>
                    <button type="submit" className="border border-orange-300 px-2 py-2 bg-orange-400 mt-[20px] rounded hover:bg-orange-500">Publish</button>
                </div>
    
            </form>
        
            )
        
}

export default NewPost;