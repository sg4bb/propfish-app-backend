import { JwtPayloadType } from './jwt-payload.type';

export type JwtPayloadWithRt = JwtPayloadType & { refreshToken: string };
