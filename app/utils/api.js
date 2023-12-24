const baseUrl = "http://localhost:8000"
const fetchData = async (apiUrl,options = {}) => {
    try {
      const response = await fetch(apiUrl,options);

      if (!response.ok) {
        // If the response status is not OK (200), throw an error
        throw new Error(`Network response not OK. Status: ${response.status}`);
      }
  
      const data = await response.json();
    
      // Return an object containing both the status code and the data
      return { status: response.status, data };
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
const createFetchRequest = (method,body)=>({
  method:method,
  headers:{
    'Content-Type':'application/json',
  },
  body:JSON.stringify(body)
})

const createPostRequst = (requestData)=>createFetchRequest('POST',requestData);
const createPutRequest = (requestData)=>createFetchRequest('PUT',requestData);

export const fetchFeaturedBlog = async()=>{
    const apiUrl = `${baseUrl}/api/blog/featured`;
    return await fetchData(apiUrl);
}

export const fetchAllPost = async()=>{
    const apiUrl = `${baseUrl}/api/blog`
    return await fetchData(apiUrl);
}

export const fetchAllPostOfUser = async(authorId)=>{
    const apiUrl = `${baseUrl}/api/blog/author/${authorId}`;
    return await fetchData(apiUrl);
}

export const fetchPostDetail = async(postId)=>{
    const apiUrl = `${baseUrl}/api/blog/${postId}`;
    return await fetchData(apiUrl);
}

export const fetchCategories = async()=>{
    const apiUrl = `${baseUrl}/api/category/`;
    return await fetchData(apiUrl);
}

export const fetchCategoryByName = async(categoryName)=>{
    const apiUrl = `${baseUrl}/api/category/getCategory/${categoryName}`
    return await fetchData(apiUrl);
}
export const fetchPostByCategoryId = async(categoryId)=>{
    const apiUrl = `${baseUrl}/api/blog/category/${categoryId}`
    return await fetchData(apiUrl);
}

export const fetchPostByTagName = async(tagName)=>{
    const apiUrl = `${baseUrl}/api/blog/search-by-tag/${tagName}`;
    return await fetchData(apiUrl);
}

export const saveCommentOnPost = async(postId,userId,comment)=>{
  const apiUrl = `${baseUrl}/api/blog/${postId}/comment`
  const options = createPostRequst({user:userId,comment});
  return await fetchData(apiUrl,options);
}

export const editPost = async(postId,postData)=>{
  const apiUrl = `${baseUrl}/api/blog/${postId}`;

    // const response = await fetch(apiUrl, {
    //   method: 'PUT', // or 'PATCH' depending on your API
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // Add any other headers you need, e.g., authorization
    //   },
    //   body: JSON.stringify(postData),
    // });
    // return response;
  const options = createPutRequest(postData);
  return await fetchData(apiUrl,options)

}

export const createPost = async(title,content,image,author,category,tags,isFeatured)=>{
  const apiUrl = `${baseUrl}/api/blog/`
  // const response =await fetch(`${baseUrl}/api/blog/`,{
  //               method: 'POST',
  //               headers: {
  //                   'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify({ title,content,image,author,category,tags,isFeatured }),
  //           })
  // return response
  const postData = {title,content,image,author,category,tags,isFeatured}
  const options = createPostRequst(postData);
  return await fetchData(apiUrl,options)         
}

export const loginUser = async(email,password)=>{
  const apiUrl = `${baseUrl}/auth/login`
//   const response =await fetch(`${baseUrl}/auth/login`,{
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ email,password }),
// })
// return response  
  const postData = {email,password}
  const options = createPostRequst(postData);
  return await fetchData(apiUrl,options);
}

