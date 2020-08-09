import { User } from './User';
import { Area } from './Area';

export interface Post {    
    childs_allowed: boolean;
    childs_taxonomy: string;
    childs_template: string;
    childs_type: string;
    content: Area[];
    created_at: string;
    data: object;
    draft_of: string;
    external_url: string;
    external_url_blank: boolean;
    is_draft: boolean;
    is_published: boolean;
    meta_description: string;
    meta_image: string;
    meta_keywords: string[];
    meta_title: string;
    name: string;
    params: string;
    parent_uuid: string;
    path: object[];
    slug: string;
    sort: number;
    taxonomy: string;
    template: string;
    type: string;
    updated_at: string;
    url: string;
    user: User;
    user_id: number;
    uuid: string;
    _revision: number;
}