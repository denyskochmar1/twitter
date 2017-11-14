export interface User {
    userid: string;
    fname: string;
    lname: string;
    image: string;
    login: string;
    password: any;
    followed: string[];
    followers: string[];
    likes: number[];
    posts: number[];
    online: boolean;
}

export interface Post {
    postid: number;
    date: string;
    message: string;
    postlike: string[];
    comments: { userid:string, message: string }[];
}