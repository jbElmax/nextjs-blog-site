
const fetchData = async (apiUrl) => {
    try {
      const response = await fetch(apiUrl);
      if (response.status === 404) {
        // If the response status is 404, return a special object indicating not found
        return { notFound: true };
      }
      if (!response.ok) {
        // If the response status is not OK (200), throw an error
        throw new Error(`Network response not OK. Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
  
      // Check if the error is due to a network issue or a non-OK response
      if (error instanceof TypeError || error.message.includes('NetworkError')) {
        return { error: 'A network error occurred. Please check your internet connection.' };
      } else {
        return { error: 'An error occurred while fetching data from the server.' };
      }
    }
  };
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

export const fetchPostByTagName = async(tagName)=>{
    const apiUrl = `http://localhost:8000/api/blog/search-by-tag/${tagName}`;
    return await fetchData(apiUrl);
}

