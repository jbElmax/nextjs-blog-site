'use client'
import { useState,useEffect } from "react";
import { fetchCategoryByName, fetchPostByCategoryId } from "../utils/api";
import Card from "../components/card/card.component";
import Loading from "../components/loading/loading";
interface Blog {
    _id: string;
    title: string;
    content: string;
    image:string;
  }
const TechTrends = ()=>{
    const categoryName = 'Tech Trends'
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
    return(
        <div>
            <h1 className="text-2xl font-medium text-center text-gray-700">Tech Trends</h1>
            
                {articles.length > 0 ?(
                    <div className="grid grid-cols-1 mx-auto lg:w-[650px] md:w-[450px] w-[350px] mt-[10px]">
                        {articles.map((article)=>{
                            return(
                                <Card key={article._id} className="px-4 py-4 rounded" {...article}/>
                            )
                        })}
                    </div>
                 
                ):(<Loading/>) }
         
        </div>
    )
}

export default TechTrends;