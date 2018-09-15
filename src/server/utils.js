const {
    IE_AWS_DEFAULT_REGION,
    IE_LAME_PATH = '/usr/bin/lame',
    IE_MEDIAINFO_PATH = '/usr/bin/mediainfo',
} = process.env
const AWS = require('aws-sdk')

AWS.config.update({ region: IE_AWS_DEFAULT_REGION })

module.exports = {
    AWS,
    lameCommand: `${IE_LAME_PATH} -b 48 -h --scale {scale} {filein} {fileout} 2>&1`,
    mediainfoCommand: `${IE_MEDIAINFO_PATH} --Output="Audio;###%Duration%###" {filename} 2>&1`,
}
