export interface Tag{
    _id:string;
    name:string;
}
export interface Author{
    _id:string;
    username:string;
}
export interface Category{
    _id:string;
    categoryName:string;
}
export interface PostData {
    title:string;
    content:string;
    image:string;
    tags:Tag[];
    category:Category;
    author:Author,
    isFeatured:boolean
}

