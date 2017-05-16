const AWS = require('aws-sdk')

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
})
const s3 = new AWS.S3()

module.exports = async filename => {
    await s3
        .deleteObject({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: `public/sounds/${filename}`,
        })
        .promise()
}
