const IE_LAME_PATH = process.env.IE_LAME_PATH || '/usr/bin/lame'
const IE_MEDIAINFO_PATH = process.env.IE_MEDIAINFO_PATH || '/usr/bin/mediainfo'

const stripBrackets = text => text.replace(/\([^)]*\)/g, '').trim()

module.exports = {
    lameCommand: `${IE_LAME_PATH} -b 48 -h --scale {scale} {filein} {fileout} 2>&1`,
    mediainfoCommand: `${IE_MEDIAINFO_PATH} --Output="Audio;###%Duration%###" {filename} 2>&1`,
    stripBrackets,
}
