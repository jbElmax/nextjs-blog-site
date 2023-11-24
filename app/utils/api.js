
export const fetchFeaturedBlog = async()=>{
    const apiUrl = "http://localhost:8000/api/blog/featured";

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
export const fetchAllPostOfUser = async(authorId)=>{
    const apiUrl = `http://localhost:8000/api/blog/author/${authorId}`;

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

export const fetchPostDetail = async(postId)=>{
    const apiUrl = `http://localhost:8000/api/blog/${postId}`;
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

export const fetchCategories = async()=>{
    const apiUrl = "http://localhost:8000/api/category/";
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