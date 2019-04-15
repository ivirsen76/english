import { ClientFunction } from '@ieremeev/app/testcafe'
import fs from 'fs-extra'
import path from 'path'

export const isAudioPlaying = ClientFunction(() => {
    const sounds = window.ieremeev.sounds
    const keys = Object.keys(sounds)

    return keys.some(item => sounds[item].instance && sounds[item].instance.playing())
})

export const restoreSamples = () => {
    const src = path.join(__dirname, 'db', 'sample.mp3')
    const dest = path.join(__dirname, '../../media/samples', 'sample.mp3')

    fs.copyFileSync(src, dest)
}
