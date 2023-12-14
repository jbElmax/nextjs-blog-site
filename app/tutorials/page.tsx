'use client'

import { useEffect,useState } from 'react';
import {fetchCategoryByName,fetchPostByCategoryId} from '../utils/api';
import Card from '../components/card/card.component';
import Loading from '../components/loading/loading';

interface Blog {
  _id: string;
  title: string;
  content: string;
  image:string;
}
const Tutorials = ()=> {
    const categoryName = 'Tutorials'
    const[categoryId,setCategoryId] = useState(''); 
    const[articles,setArticles] = useState<Blog[]>([]);
    const extractFirst50Words = (content:string) => {
        const words = content.split(' ');
        const first40Words = words.slice(0, 40).join(' ');
        return first40Words;
      };
    async function getCategory(){
        const category = await fetchCategoryByName(categoryName);
        
        
        return category._id;
        // console.log(data);
    }
    const getArticles = async()=>{
        const data = await fetchPostByCategoryId(await getCategory());
        setArticles(data);
    }
    useEffect(()=>{
        //getCategory();
        getArticles();
    },[])
  return (
    <div>
      <h1 className='text-center text-2xl font-medium mt-[20px] md:mt-[300px] lg:mt-[25px] text-gray-700'>Tutorials</h1>

      {articles.length > 0 ? (
        <div className='grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4 mx-auto mt-[20px] place-items-center'>
          {articles.map((blog) => (
            <Card key={blog._id} className='lg:w-[400px] w-[350px] px-4 py-4 rounded' {...blog}/>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}
export default Tutorials;
