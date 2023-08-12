import { JwtPayloadType } from './jwt-payload.type';

export type JwtPayloadWithRtType = JwtPayloadType & { refreshToken: string };
