import {
  removeFromArrayAtPosition,
  addInArrayAtPosition,
  changeElementOfPositionInArray,
  replaceElementOfArray,
  getUuid
} from '../../../../../helpers/utils'

function reorderModulesOnArea(area, reorderModules) {
  return { ...area, modules: reorderModules(area.modules) }
}

function moveModule(board, { fromPosition, fromAreaId }, { toPosition, toAreaId }) {
  const sourceArea = board.areas.find(area => area.id === fromAreaId)
  const destinationArea = board.areas.find(area => area.id === toAreaId)

  const reorderAreasOnBoard = reorderAreasMapper => ({ ...board, areas: board.areas.map(reorderAreasMapper) })
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


function addModule(board, inArea, module, { on } = {}) {

  const uuid = getUuid();

  module.id = uuid;

  const areaToAdd = board.areas.find(({ id }) => id === inArea.id)

  const modules = addInArrayAtPosition(areaToAdd.modules, module, on === 'top' ? 0 : areaToAdd.modules.length)
  const areas = replaceElementOfArray(board.areas)({
    when: ({ id }) => inArea.id === id,
    for: value => ({ ...value, modules })
  })
  return { ...board, areas }
}

function removeModule(board, fromArea, module) {
  const areaToRemove = board.areas.find(({ id }) => id === fromArea.id)
  const filteredModules = areaToRemove.modules.filter(({ id }) => module.id !== id)
  const areaWithoutModule = { ...areaToRemove, modules: filteredModules }
  const filteredAreas = board.areas.map(area => (fromArea.id === area.id ? areaWithoutModule : area))
  return { ...board, areas: filteredAreas }
}



function updateModule(board, module, updatedModule) {

  console.log('updateModule');
  

  let area = null;

  board.areas.forEach(ar => {

    let moduleIndex = ar.modules.findIndex(el => el.id === module.id)
    if( moduleIndex !== -1){

      area = ar;
      
      ar.modules[moduleIndex] = updatedModule;

    }

  })

  const areas = replaceElementOfArray(board.areas)({
    when: ({ id }) => area.id === id,
    for: value => ({ ...value, modules: area.modules })
  })

  return { ...board, areas: areas }

}


export { moveModule, addModule, removeModule, updateModule }
