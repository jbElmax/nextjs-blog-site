export interface Tag{
    _id:string;
    name:string;
}
export interface Author{
    _id:string;
    username:string;
}
export interface User{
    _id:string;
    username:string;
    email:string;

}
export interface Comment{
    _id:string;
    user:User;
    comment:string

}
export interface DetailedPost {
    _id:string;
    title:string;
    content:string;
    image:string;
    author:Author;
    createdAt:string;
    tags:Tag[],
    comments:Comment[]

}