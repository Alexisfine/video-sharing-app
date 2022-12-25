import {TDate} from "timeago.js";

export interface IVideo {
    _id: string,
    userId: string,
    title: string,
    description: string,
    imgUrl: string,
    videoUrl: string,
    videoViews: number,
    likes: string[],
    dislikes: string[],
    tags: string[],
    createdAt: TDate,
    updatedAt: TDate,
}

export interface IUser {
    _id?: string,
    name?: string,
    img?: string,
    subscribers?:number,
    subscribeUsers?:string[],
}

export interface IComment {
    _id: string,
    userId: string,
    videoId: string,
    description?:string,
    createdAt: TDate,
    updatedAt: TDate,
}