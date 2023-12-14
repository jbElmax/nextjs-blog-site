const fetchData = async(apiUrl)=>{
    try{
        const response = await fetch(apiUrl);

        if(!response.ok){
            console.log('network response not ok');
        }

        const data = await response.json();
        return data;
    }catch(error){
        console.log(error);
        return null;
    }
}
export const fetchFeaturedBlog = async()=>{
    const apiUrl = "http://localhost:8000/api/blog/featured";
    return await fetchData(apiUrl);
}

export const fetchAllPost = async()=>{
    const apiUrl = "http://localhost:8000/api/blog"
    return await fetchData(apiUrl);
}

export const fetchAllPostOfUser = async(authorId)=>{
    const apiUrl = `http://localhost:8000/api/blog/author/${authorId}`;
    return await fetchData(apiUrl);
}

export const fetchPostDetail = async(postId)=>{
    const apiUrl = `http://localhost:8000/api/blog/${postId}`;
    return await fetchData(apiUrl);
}

export const fetchCategories = async()=>{
    const apiUrl = "http://localhost:8000/api/category/";
    return await fetchData(apiUrl);
}

export const fetchCategoryByName = async(categoryName)=>{
    const apiUrl = `http://localhost:8000/api/category/getCategory/${categoryName}`
    return await fetchData(apiUrl);
}
export const fetchPostByCategoryId = async(categoryId)=>{
    const apiUrl = `http://localhost:8000/api/blog/category/${categoryId}`
    return await fetchData(apiUrl);
}