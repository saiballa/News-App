export interface UserDetails {
    source:{
        id:number | null;
        name:string;
    },
    author:string;
    title:string;
    description:string;
    urlToImage:string;
    publishedAt:string;
}

export const API_KEY = "dfb0bce670c6407fae8bbf061628f763"