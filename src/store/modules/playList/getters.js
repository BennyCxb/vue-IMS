export default {
    getActive: state => {
        for (let i = 0, l = state.playlist.length; i < l; i++) {
            let playlist = state.playlist[i]

            if (playlist.active) {
                return i
            }
        }
        return null
    }
}
