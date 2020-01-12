import {
  removeFromArrayAtPosition,
  addInArrayAtPosition,
  changeElementOfPositionInArray,
  replaceElementOfArray,
  getUuid,
  cloneObject
} from '../../../../../helpers/utils'

function reorderModulesOnArea(area, reorderModules) {
  return { ...area, modules: reorderModules(area.modules) }
}

function moveModule(page, { fromPosition, fromAreaId }, { toPosition, toAreaId }) {
  const sourceArea = page.content.find(area => area.id === fromAreaId)
  const destinationArea = page.content.find(area => area.id === toAreaId)

  const reorderAreasOnBoard = reorderAreasMapper => ({ ...page, content: page.content.map(reorderAreasMapper) })
  const reorderModulesOnSourceArea = reorderModulesOnArea.bind(null, sourceArea)
  const reorderModulesOnDestinationArea = reorderModulesOnArea.bind(null, destinationArea)

  if (sourceArea.id === destinationArea.id) {
    const reorderedModulesOnArea = reorderModulesOnSourceArea(modules => {
      return changeElementOfPositionInArray(modules, fromPosition, toPosition)
    })
    return reorderAreasOnBoard(area => (area.id === sourceArea.id ? reorderedModulesOnArea : area))
  } else {
    const reorderedModulesOnSourceArea = reorderModulesOnSourceArea(modules => {
      return removeFromArrayAtPosition(modules, fromPosition)
    })
    const reorderedModulesOnDestinationArea = reorderModulesOnDestinationArea(modules => {
      return addInArrayAtPosition(modules, sourceArea.modules[fromPosition], toPosition)
    })
    return reorderAreasOnBoard(area => {
      if (area.id === sourceArea.id) return reorderedModulesOnSourceArea
      if (area.id === destinationArea.id) return reorderedModulesOnDestinationArea
      return area
    })
  }
}


function addModule(page, library, inArea, module, { on } = {}) {

  module.id = getUuid();

  // const defaultsFile = await import(`../modules/${module.component}/defaults.js`)  
  // module.fields = defaultsFile.defaults

  const defaults = library[module.component].defaults
  module.fields = defaults

  const areaToAdd = page.content.find(({ id }) => id === inArea.id)

  const modules = addInArrayAtPosition(areaToAdd.modules, module, on === 'top' ? 0 : areaToAdd.modules.length)
  const content = replaceElementOfArray(page.content)({
    when: ({ id }) => inArea.id === id,
    for: value => ({ ...value, modules })
  })

  return { ...page, content }
}


function cloneModule(page, inArea, module, { on } = {}) {
  
  let newModule = cloneObject(module);
      newModule.id = getUuid();

  const areaToAdd = page.content.find(({ id }) => id === inArea.id)

  const modules = addInArrayAtPosition(areaToAdd.modules, newModule, on === 'top' ? 0 : areaToAdd.modules.length)
  const content = replaceElementOfArray(page.content)({
    when: ({ id }) => inArea.id === id,
    for: value => ({ ...value, modules })
  })

  return { ...page, content }
}


function removeModule(page, fromArea, module) {
  const areaToRemove = page.content.find(({ id }) => id === fromArea.id)
  const filteredModules = areaToRemove.modules.filter(({ id }) => module.id !== id)
  const areaWithoutModule = { ...areaToRemove, modules: filteredModules }
  const filteredAreas = page.content.map(area => (fromArea.id === area.id ? areaWithoutModule : area))
  return { ...page, content: filteredAreas }
}



function updateModuleFields(page, module, fields) {

  let area = null;

  page.content.forEach(ar => {

    let moduleIndex = ar.modules.findIndex(el => el.id === module.id)
    if( moduleIndex !== -1){

      area = ar;
      
      ar.modules[moduleIndex].fields = fields;

    }

  })

  const content = replaceElementOfArray(page.content)({
    when: ({ id }) => area.id === id,
    for: value => ({ ...value, modules: area.modules })
  })

  return { ...page, content: content }

}





function changeTemplate(page,templateName) {
  
  const template = templateName

  return { ...page, template }
}


export { moveModule, addModule, removeModule, cloneModule, updateModuleFields, changeTemplate }
