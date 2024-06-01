const fs = require('fs').promises
const crypto = require('crypto');
const sessionSecretKey = crypto.randomBytes(16).toString('hex')
const accessSecretKey = crypto.randomBytes(16).toString('hex');
const refreshSecretKey = crypto.randomBytes(16).toString('hex');
await writeSecret(sessionSecretKey, accessSecretKey, refreshSecretKey)

async function writeSecret(session, access, refresh) {
    const key = `\nSESSION_SECRET=${session}\nACCESS_SECRET_KEY=${access}\nREFRESH_SECRET_KEY=${refresh}`;
    const filePath = '.env';

    try {
        await fs.appendFile(filePath, key);
        console.log('success write secret key');
    } catch (e) {
        console.error('failed write secret key', e);
    }
}

