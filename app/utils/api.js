//const baseUrl = 'https://blog-api-xit6.onrender.com'
const baseUrl = process.env.apiUrl
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
const createHeaders = (isAuthenticated,token)=>{
  const headers = new Headers();
  if(isAuthenticated){
    headers.append('Authorization',`Bearer ${token}`);
    headers.append('Content-type','application/json');
  }else{
    headers.append('Content-type','application/json');
  }
  return headers;
}
const createFetchRequest = (method,body,isAuthenticated,token)=>({
  method:method,
  headers:createHeaders(isAuthenticated,token),
  body:JSON.stringify(body)
})

const createDeleteFetchRequest = (method,isAuthenticated,token)=>({
  method:method,
  headers:createHeaders(isAuthenticated,token)
})

const createPostRequst = (requestData,isAuthenticated,token)=>createFetchRequest('POST',requestData,isAuthenticated,token);
const createPutRequest = (requestData,isAuthenticated,token)=>createFetchRequest('PUT',requestData,isAuthenticated,token);
const createDeleteRequest = (isAuthenticated,token)=>createDeleteFetchRequest('DELETE',isAuthenticated,token)

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

export const saveCommentOnPost = async(postId,userId,comment,token)=>{
  const apiUrl = `${baseUrl}/api/blog/${postId}/comment`
  const options = createPostRequst({user:userId,comment},true,token);
  return await fetchData(apiUrl,options);
}

export const editPost = async(postId,postData)=>{
  const apiUrl = `${baseUrl}/api/blog/${postId}`;
  const options = createPutRequest(postData);
  return await fetchData(apiUrl,options)

}

export const createPost = async(postData,token)=>{
  const apiUrl = `${baseUrl}/api/blog/`
  
  const options = createPostRequst(postData,true,token);
  return await fetchData(apiUrl,options)         
}

export const signInUser = async(email,password)=>{
  const apiUrl = `${baseUrl}/auth/login`
  const postData = {email,password}
  const options = createPostRequst(postData,false);
  return await fetchData(apiUrl,options);
}

export const signUpUser = async(username,email, password )=>{
  const apiUrl = `${baseUrl}/auth/register`
  const postData = {username,email, password}
  const options = createPostRequst(postData,false);
  return await fetchData(apiUrl,options);
}

export const deleteBlogPost = async(postId,token)=>{
  const apiUrl = `${baseUrl}/api/blog/${postId}`
  const options = createDeleteRequest(true,token);
  return await fetchData(apiUrl,options);
}

