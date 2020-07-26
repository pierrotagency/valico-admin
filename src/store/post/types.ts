import { Post } from "../../models/Post";

export interface StorePostState {
    post?: Post | null,
    posts?: Post[],
    tag: any,
    loadingPosts: boolean,
    loadingPost: boolean,
    viewPost?: Post | null,
    loadingViewPost: boolean,
    savingPost: boolean,
    epp: number,
    page: number,
    sort: string,
    savingPostError: any,
}