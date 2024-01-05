'use client'

import { useEffect,useState } from 'react';
import {fetchAllPost,fetchPostByTagName} from './utils/api';
import Card from './components/card/card.component';
import Loading from './components/loading/loading';

type Blog = {
  _id: string;
  title: string;
  content: string;
  image:string;
}
const Home = ()=> {
  const [allPost, setAllPost] = useState<Blog[]>([]);
  const [searchTag,setSearchTag] = useState('');
  const [isLoading,setIsLoading] = useState(true);
  const extractFirst50Words = (content:string) => {
    const words = content.split(' ');
    const first40Words = words.slice(0, 40).join(' ');
    return first40Words;
  };

  const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setSearchTag(e.target.value);

  }
  const fetchData = async()=>{
      
    const response = await fetchAllPost();
    setAllPost(response.data ?? []);
  };

  const onSubmitHandler = async(e:React.FormEvent)=>{
    e.preventDefault();
    setIsLoading(true);
  
    if (searchTag.length !== 0) {
      try {
        const response = await fetchPostByTagName(searchTag);

          setAllPost(response.data ?? []);

      } catch (error) {
        alert('Error occurred');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please type something in the search field');
      setIsLoading(false);
    }


  }

  useEffect(()=>{

    setIsLoading(true);
    fetchData();
    setIsLoading(false);

  },[])
  return (
    <div>
      <h1 className='text-center text-2xl font-medium mt-[20px] md:mt-[300px] lg:mt-[25px] text-gray-700'>All Articles</h1>
      <div className='flex flex-row justify-center'>
        <form onSubmit={onSubmitHandler}>
        <input value={searchTag} onChange={onChangeHandler} type="text" className="px-3 py-2 border-2 border-gray-200 rounded-l-full focus:outline-none focus:ring focus:ring-green-300 lg:w-[350px] w-[250px] text-base mt-[20px]" placeholder="Search by tag"/><button className='border-2 border-gray-200 rounded-r-full mt-[20px] px-3 py-2 text-gray-700 hover:bg-green-200 focus:outline-none focus:ring focus:ring-green-300' type='submit'>Search</button>
        </form>
        </div>
      { isLoading ? (
        <Loading />
      )
      :allPost.length > 0 ? (
        <div className='grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4 mt-[10px] place-items-center'>
          {allPost.map((blog) => (

            <Card key={blog._id} className='lg:w-[350px] w-[350px] px-4 py-4 rounded' {...blog}/>

          ))}
        </div>
      ) : ( 
        
        <p>No post found</p>
      )}
    </div>
  )
}
export default Home;
