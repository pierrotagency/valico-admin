import {
  removeFromArrayAtPosition,
  addInArrayAtPosition,
  changeElementOfPositionInArray,
  replaceElementOfArray,
  getUuid
} from '../../../../../helpers/utils'

function reorderModulesOnLane(lane, reorderModules) {
  return { ...lane, modules: reorderModules(lane.modules) }
}

function moveModule(board, { fromPosition, fromLaneId }, { toPosition, toLaneId }) {
  const sourceLane = board.lanes.find(lane => lane.id === fromLaneId)
  const destinationLane = board.lanes.find(lane => lane.id === toLaneId)

  const reorderLanesOnBoard = reorderLanesMapper => ({ ...board, lanes: board.lanes.map(reorderLanesMapper) })
  const reorderModulesOnSourceLane = reorderModulesOnLane.bind(null, sourceLane)
  const reorderModulesOnDestinationLane = reorderModulesOnLane.bind(null, destinationLane)

  if (sourceLane.id === destinationLane.id) {
    const reorderedModulesOnLane = reorderModulesOnSourceLane(modules => {
      return changeElementOfPositionInArray(modules, fromPosition, toPosition)
    })
    return reorderLanesOnBoard(lane => (lane.id === sourceLane.id ? reorderedModulesOnLane : lane))
  } else {
    const reorderedModulesOnSourceLane = reorderModulesOnSourceLane(modules => {
      return removeFromArrayAtPosition(modules, fromPosition)
    })
    const reorderedModulesOnDestinationLane = reorderModulesOnDestinationLane(modules => {
      return addInArrayAtPosition(modules, sourceLane.modules[fromPosition], toPosition)
    })
    return reorderLanesOnBoard(lane => {
      if (lane.id === sourceLane.id) return reorderedModulesOnSourceLane
      if (lane.id === destinationLane.id) return reorderedModulesOnDestinationLane
      return lane
    })
  }
}


function addModule(board, inLane, module, { on } = {}) {

  const uuid = getUuid();

  console.log(uuid);

  module.id = uuid;

  const laneToAdd = board.lanes.find(({ id }) => id === inLane.id)

  const modules = addInArrayAtPosition(laneToAdd.modules, module, on === 'top' ? 0 : laneToAdd.modules.length)
  const lanes = replaceElementOfArray(board.lanes)({
    when: ({ id }) => inLane.id === id,
    for: value => ({ ...value, modules })
  })
  return { ...board, lanes }
}

function removeModule(board, fromLane, module) {
  const laneToRemove = board.lanes.find(({ id }) => id === fromLane.id)
  const filteredModules = laneToRemove.modules.filter(({ id }) => module.id !== id)
  const laneWithoutModule = { ...laneToRemove, modules: filteredModules }
  const filteredLanes = board.lanes.map(lane => (fromLane.id === lane.id ? laneWithoutModule : lane))
  return { ...board, lanes: filteredLanes }
}

export { moveModule, addModule, removeModule }
