import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRtType } from 'src/auth/types/jwt-payload-rt.type';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRtType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!data) {
      return request.user;
    }

    return request.user[data];
  },
);
