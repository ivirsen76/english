const path = require('path')

const {
    IE_LAME_PATH = '/usr/bin/lame',
    IE_MEDIAINFO_PATH = '/usr/bin/mediainfo',
    IE_MEDIA_PATH,
} = process.env

module.exports = {
    lameCommand: `${IE_LAME_PATH} -b 48 -h --scale {scale} {filein} {fileout} 2>&1`,
    mediainfoCommand: `${IE_MEDIAINFO_PATH} --Output="Audio;###%Duration%###" {filename} 2>&1`,
    mediaPath: IE_MEDIA_PATH || path.join(__dirname, '..', '..', 'media'),
}
