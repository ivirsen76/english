import { ClientFunction } from 'testcafe'

export const isAudioPlaying = ClientFunction(() => {
    const sounds = window.ieremeev.sounds
    const keys = Object.keys(sounds)

    return keys.some(item => sounds[item].instance && sounds[item].instance.playing())
})
