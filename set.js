const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0gvRUExVUF5Nkp1RmhtSHdaOE42Nit2cGFRWGRJd0FEaklTbU04NHFHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVjVCWDVxSzlYdEl6b1REdlNIY0Q5eHJoVkhzSzJXL2hKZ2R5L0lBNjAxTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjS1VMWXJjcVRKaEk0Uk5CbGVteTFHWlBIZ1I2alBtMC9zRGNNQThteDNRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvdndONGJkMFJCd3BibEhRRURaUzhiZEg1OSs3QzlRMmVkVnNmQjN3eEQwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1KYndVV1JORDF0UGE4ZkNCTGZnUUVtS0V5NGlRNnk0cUNLYlNraDE1bTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM4eHA3TFV6VHVINHEzaVRlZy82b3RvL3hGZkJzdVJzQ2tVOHJranJKaE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibURHOWt4a2g0aVJySXhsd0FuYVVMME04Q29ZdGhTTElrUWxxSmFpN3kzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicWRBSm82ZVZpb2gvRDI4QUkvU0VBMktWSHFjKzdGOU9GYmc1SVcwcVlWQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlyOWFTSHB4ck91elJHSXNLbjQ5K1BjL2VoOEp1Wi9ZRmxTQWVVUFc3ZzlNWVhwVWxHMG1vNUFVNkhYbVJnMCtCRkdVQWwwUis5Ui9uLzJMeFdsaENBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMyLCJhZHZTZWNyZXRLZXkiOiI4Nml4YmNwUFhYUExidzYwSEJqd3lWMGx3YzB6WTBqYVg2TnQvTjRiaVFJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJiWU5FMFZSTVRocUNzc2JHeUJubnJ3IiwicGhvbmVJZCI6Ijg4OGRiZTYyLTNlODgtNDIxMC04NmZlLWE2YzI5ZGZmZTlmZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1YXplMzV6NFJ4MTE5Z3JrUXQzbXpEWVJpelU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN0orWjZkSjdnalZmR3pTaUlOb01ib0hyNkRvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZDSjJQUkFaIiwibWUiOnsiaWQiOiIyNTQxMDQ5MTYwOTE6NTBAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lHem1aQUNFS2JrNExzR0dBb2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlFvWkhvTS9iVjJ3T2dnYXNQcDJNZVFOODNkcU1BZjlNNmh1SlRMMDdHemM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IklCTzk0SlFRdzdZSmUzZGlzcks4eHFUNng0dmFuaEw5cm1hbzJWd1p2OUxHTzdFRWd6OU51V1pyMmxaRndidmFhN2drNGFTT2pTWG1WejgrRGFWNkFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaT01qS25ybnlrcTZ3YmhXdWx3YUJqbDkvZEpjQll3YU9vdGg3WVFTZy9QSmRYL25GWHdnVmJ3c1BZTEhOMDZOQVdBWTliNWtNY3hTbkRuOWNmTTRBdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwNDkxNjA5MTo1MEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVS0dSNkRQMjFkc0RvSUdyRDZkakhrRGZOM2FqQUgvVE9vYmlVeTlPeHMzIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1OTMwNDIwfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Alvino",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 254104916091",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'typing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
