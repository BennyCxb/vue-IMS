import {
  ENABLE_ACTIVE,
  DISABLE_ACTIVE,
  ENABLE_ASPECT,
  DISABLE_ASPECT,
  ENABLE_DRAGGABLE,
  DISABLE_DRAGGABLE,
  ENABLE_RESIZABLE,
  DISABLE_RESIZABLE,
  ENABLE_PARENT_LIMITATION,
  DISABLE_PARENT_LIMITATION,
  CHANGE_ZINDEX,
  ENABLE_BOTH_AXIS,
  ENABLE_X_AXIS,
  ENABLE_Y_AXIS,
  ENABLE_NONE_AXIS,
  CHANGE_HEIGHT,
  CHANGE_LEFT,
  CHANGE_MINH,
  CHANGE_MINW,
  CHANGE_TOP,
  CHANGE_WIDTH,
  ADD_OBJECT
} from './mutation-types';

export default {
  [ENABLE_ACTIVE] (state, id) {
    state.playlist[id].active = true
  },
  [DISABLE_ACTIVE] (state, id) {
    state.playlist[id].active = false
  },

  [ENABLE_ASPECT] (state, id) {
    state.playlist[id].aspectRatio = true
  },
  [DISABLE_ASPECT] (state, id) {
    state.playlist[id].aspectRatio = false
  },

  [ENABLE_DRAGGABLE] (state, id) {
    state.playlist[id].draggable = true
  },
  [DISABLE_DRAGGABLE] (state, id) {
    state.playlist[id].draggable = false
  },

  [ENABLE_RESIZABLE] (state, id) {
    state.playlist[id].resizable = true
  },
  [DISABLE_RESIZABLE] (state, id) {
    state.playlist[id].resizable = false
  },

  [ENABLE_BOTH_AXIS] (state, id) {
    state.playlist[id].axis = 'both'
  },
  [ENABLE_NONE_AXIS] (state, id) {
    state.playlist[id].axis = 'none'
  },
  [ENABLE_X_AXIS] (state, id) {
    state.playlist[id].axis = 'x'
  },
  [ENABLE_Y_AXIS] (state, id) {
    state.playlist[id].axis = 'y'
  },

  [ENABLE_PARENT_LIMITATION] (state, id) {
    state.playlist[id].parentLim = true
  },
  [DISABLE_PARENT_LIMITATION] (state, id) {
    state.playlist[id].parentLim = false
  },

  [CHANGE_ZINDEX] (state, payload) {
    state.playlist[payload.id].zIndex = payload.zIndex
  },

  [CHANGE_HEIGHT] (state, payload) {
    state.playlist[payload.id].height = payload.height
  },

  [CHANGE_WIDTH] (state, payload) {
    state.playlist[payload.id].width = payload.width
  },

  [CHANGE_TOP] (state, payload) {
    state.playlist[payload.id].top = payload.top
  },

  [CHANGE_LEFT] (state, payload) {
    state.playlist[payload.id].left = payload.left
  },

  [CHANGE_MINH] (state, payload) {

    state.playlist[payload.id].minh = payload.minh
  },

  [CHANGE_MINW] (state, payload) {
    state.playlist[payload.id].minw = payload.minw
  },

  [ADD_OBJECT] (state, payload) {
    state.playlist.push(payload)
  }
}
