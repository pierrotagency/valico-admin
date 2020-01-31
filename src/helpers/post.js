

function findModuleInPost(post, searchProperty, searchValue, defaultValue = {}) {
  let res = defaultValue

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

