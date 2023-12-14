'use client'

import { useEffect,useState } from 'react';
import {fetchAllPost} from './utils/api';
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
  const extractFirst50Words = (content:string) => {
    const words = content.split(' ');
    const first40Words = words.slice(0, 40).join(' ');
    return first40Words;
  };
  useEffect(()=>{
    const fetchData = async()=>{
      const data = await fetchAllPost();
      setAllPost(data ?? []);
    };

    fetchData();

  },[])
  return (
    <div>
      <h1 className='text-center text-2xl font-medium mt-[20px] md:mt-[300px] lg:mt-[25px] text-gray-700'>All Articles</h1>
      {allPost.length > 0 ? (
        <div className='grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4 mt-[10px] place-items-center'>
          {allPost.map((blog) => (

            <Card key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded' {...blog}/>

          ))}
        </div>
      ) : (
        <Loading/>
      )}
    </div>
  )
}
export default Home;
