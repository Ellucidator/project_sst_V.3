import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/User.js";
import { User } from "../models/index.js";
import { jwtService } from "../services/jwtServices.js";
import { JwtPayload } from "jsonwebtoken";
import * as crypto from 'crypto';



export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export const ensureAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const tokenAuthorization = req.headers.authorization

    if (!tokenAuthorization) return res.status(401).json({ error: 'No token' })
    const token = tokenAuthorization.replace(/Bearer /, '')

    jwtService.verifyToken(token, (err, decoded) => {
        if (err || !decoded) return res.status(401).json({ error: 'Invalid token' })

        User.findOne({ where: { email: (decoded as JwtPayload).email } }).then((user) => {
            req.user = user
            next()
        })
    })
}

export const ensureAuthNotificationMp = (req: Request, res: Response, next: NextFunction) => {
    const xSignature = req.headers['x-signature']
    const xRequestId = req.headers['x-request-id']

    if (!xSignature || !xRequestId) return res.status(401).json({ error: 'Invalid signature' })

    const dataID = req.query['data.id']

    const parts = (xSignature as string).split(',');

    let ts: string = ''
    let hash: string = ''

    parts.forEach(part => {
        const [key, value] = part.split('=');
        if (key && value) {
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            if (trimmedKey === 'ts') {
                ts = trimmedValue;
            } else if (trimmedKey === 'v1') {
                hash = trimmedValue;
            }
        }
    });

    const secret = process.env.SECRET_KEY_MP!

    const manifest = `id:${dataID};request-id:${xRequestId};ts:${ts};`;

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(manifest);

    const sha = hmac.digest('hex');

if (sha === hash) {
    console.log("HMAC verification passed");
    next();
} else {
    res.status(401).json({ error: 'HMAC verification failed' });
}
}