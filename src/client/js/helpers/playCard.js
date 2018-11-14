import { play } from 'client/js/utils/mp3.js'
import { getMediaUrl } from 'client/js/utils/media.js'

export default async card => {
    if (!card) {
        return
    }

    if (!card.usSoundFile || !card.ruSoundFile) {
        throw new Error('Card object is invalid')
    }

    await play(getMediaUrl(card.usSoundFile))
    await new Promise(resolve => setTimeout(resolve, 500))
    await play(getMediaUrl(card.ruSoundFile))
}
