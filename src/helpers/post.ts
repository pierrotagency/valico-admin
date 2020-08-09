import { Module } from "../models/Module";
import { Post } from "../models/Post";

function findModuleInPost(post: Post, searchProperty: string, searchValue: string): Module | null {
  let res = null;

  if(post && post.content){
    post.content.forEach(area => {
      
      const moduleIndex = area.modules.findIndex(el => el[searchProperty] === searchValue)

      if( moduleIndex >= 0){

        res = area.modules[moduleIndex];

      }

    })
  }

  return res

}


export {
  findModuleInPost
}

