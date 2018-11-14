import { Howl } from 'howler'
import _filter from 'lodash/filter'
import notification from '@ieremeev/notification'
import _set from 'lodash/set'

const sounds = {}
_set(window, 'ieremeev.sounds', sounds)

export const preload = async url => {
    const interval = 100
    const timeout = 30 * 1000

    try {
        if (sounds[url] && sounds[url].status === 'done') {
            // Do nothing. We have sound
        } else if (sounds[url] && sounds[url].status === 'inProgress') {
            // Wait for sound to be preloaded
            await new Promise((resolve, reject) => {
                let timeoutHandler
                let intervalHandler

                intervalHandler = setInterval(() => {
                    if (sounds[url].status === 'done') {
                        clearInterval(intervalHandler)
                        clearTimeout(timeoutHandler)
                        resolve()
                    }
                }, interval)

                timeoutHandler = setTimeout(() => {
                    clearInterval(intervalHandler)
                    reject(`Time is out. Couldn't preload "${url}"`)
                }, timeout)
            })
        } else {
            // Preload sound
            sounds[url] = {
                status: 'inProgress',
            }

            await new Promise((resolve, reject) => {
                const sound = new Howl({
                    src: [url],
                    onload: () => {
                        sounds[url].status = 'done'
                        sounds[url].instance = sound
                        resolve()
                    },
                    onloaderror: () => {
                        sounds[url].status = 'failed'
                        reject(`Couldn't preload "${url}"`)
                    },
                })
            })
        }
    } catch (e) {
        const message = `Audio error. ${e}`
        notification({ message, type: 'danger', duration: 0 })
        throw new Error(message)
    }

    return sounds[url].instance
}

export const play = async url => {
    const instance = await preload(url)

    // Stop all other sounds
    _filter(sounds, sound => sound.instance && sound.instance.playing()).forEach(sound =>
        sound.instance.stop()
    )

    return new Promise(resolve => {
        instance.on('end', () => {
            resolve(instance)
        })
        instance.play()
    })
}
