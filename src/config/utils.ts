
import { Timestamp } from "typeorm";
const fs = require('fs');
import jwt, {SignOptions, VerifyErrors, VerifyOptions} from 'jsonwebtoken'
require('dotenv').config()


export interface JwtPayload {
    uuid: string
}

interface JwtConfig {
    privateKeyFile: string,
    privateKeyPassphrase: string,
    publicKeyFile: string
}
const jwtConfig: JwtConfig = {
    privateKeyFile: process.env.PRIVATE_KEY_FILE,
    privateKeyPassphrase: process.env.PRIVATE_KEY_PASSPHRASE,
    publicKeyFile: process.env.PUBLIC_KEY_FILE
}


export const privateKey    = fs.readFileSync(jwtConfig.privateKeyFile)
export const privateSecret = {
    key: privateKey,
    passphrase: jwtConfig.privateKeyPassphrase
}

export const signOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '1d'
}

export const publicKey = fs.readFileSync(jwtConfig.publicKeyFile)
export const verifyOptions: VerifyOptions = {
    algorithms: ['RS256']
}
