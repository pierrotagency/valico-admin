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
  const sourceArea = page.areas.find(area => area.id === fromAreaId)
  const destinationArea = page.areas.find(area => area.id === toAreaId)

  const reorderAreasOnBoard = reorderAreasMapper => ({ ...page, areas: page.areas.map(reorderAreasMapper) })
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

  const areaToAdd = page.areas.find(({ id }) => id === inArea.id)

  const modules = addInArrayAtPosition(areaToAdd.modules, module, on === 'top' ? 0 : areaToAdd.modules.length)
  const areas = replaceElementOfArray(page.areas)({
    when: ({ id }) => inArea.id === id,
    for: value => ({ ...value, modules })
  })

  return { ...page, areas }
}


function cloneModule(page, inArea, module, { on } = {}) {
  
  let newModule = cloneObject(module);
      newModule.id = getUuid();

  const areaToAdd = page.areas.find(({ id }) => id === inArea.id)

  const modules = addInArrayAtPosition(areaToAdd.modules, newModule, on === 'top' ? 0 : areaToAdd.modules.length)
  const areas = replaceElementOfArray(page.areas)({
    when: ({ id }) => inArea.id === id,
    for: value => ({ ...value, modules })
  })

  return { ...page, areas }
}


function removeModule(page, fromArea, module) {
  const areaToRemove = page.areas.find(({ id }) => id === fromArea.id)
  const filteredModules = areaToRemove.modules.filter(({ id }) => module.id !== id)
  const areaWithoutModule = { ...areaToRemove, modules: filteredModules }
  const filteredAreas = page.areas.map(area => (fromArea.id === area.id ? areaWithoutModule : area))
  return { ...page, areas: filteredAreas }
}



function updateModuleFields(page, module, fields) {

  let area = null;

  page.areas.forEach(ar => {

    let moduleIndex = ar.modules.findIndex(el => el.id === module.id)
    if( moduleIndex !== -1){

      area = ar;
      
      ar.modules[moduleIndex].fields = fields;

    }

  })

  const areas = replaceElementOfArray(page.areas)({
    when: ({ id }) => area.id === id,
    for: value => ({ ...value, modules: area.modules })
  })

  return { ...page, areas: areas }

}





function changeLayout(page,layoutName) {
  
  const layout = layoutName

  return { ...page, layout }
}


export { moveModule, addModule, removeModule, cloneModule, updateModuleFields, changeLayout }
