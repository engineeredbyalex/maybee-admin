import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from '@aws-sdk/client-s3';
import multiparty from 'multiparty';

const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
});

export default async function handle(req, res) {
    try {
        console.log("Request received:", req); // Log the received request for debugging

        // Set the content-type header
        const form = new multiparty.Form();
        form.on('part', function (part) {
            if (!part.filename) {
                part.resume();
            }
        });

        // Parse the request and extract the uploaded files
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    console.error('Error parsing request:', err);
                    reject(err);
                }
                resolve({ fields, files });
            });
        });

        console.log("Parsed fields:", fields); // Log the parsed fields for debugging
        console.log("Parsed files:", files); // Log the parsed files for debugging

        // Delete S3 objects
        for (const imageUrl of files) {
            const bucketParams = { Bucket: "BUCKET_NAME", Key: imageUrl };
            console.log(`Deleting object with key ${imageUrl}`);
            await s3Client.send(new DeleteObjectCommand(bucketParams));
            console.log(`Object with key ${imageUrl} deleted.`);
        }

        return res.status(200).json({ message: 'Images deleted successfully' });
    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const config = {
    api: { bodyParser: false },
};
