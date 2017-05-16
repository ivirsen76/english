import { soundManager as sm } from 'soundmanager2/script/soundmanager2-nodebug.js'

export default {
    limit: 10,
    sounds: [],

    preload(filename) {
        if (this.sounds.includes(filename)) {
            return
        }

        sm
            .createSound({
                id: filename,
                url: filename,
            })
            .load()

        this.sounds.push(filename)
        if (this.sounds.length > this.limit) {
            sm.destroySound(this.sounds.shift())
        }
    },

    play(filename) {
        sm.stopAll()
        this.preload(filename)
        sm.getSoundById(filename).play()
    },
}
