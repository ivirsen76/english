const { IE_LAME_PATH, IE_MEDIAINFO_PATH } = process.env

module.exports = {
    lameCommand: `${IE_LAME_PATH} -b 48 -h --scale {scale} {filein} {fileout} 2>&1`,
    mediainfoCommand: `${IE_MEDIAINFO_PATH} --Output="Audio;###%Duration%###" {filename} 2>&1`,
}
