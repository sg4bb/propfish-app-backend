import { JwtService } from '@nestjs/jwt';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZGIwOGY2NC0xNjkwLTRmODYtYjVkYS0wNDBjNjNiNTY3NjEiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2OTE4MDE1MjEsImV4cCI6MTY5MjQwNjMyMX0.fyWEr5A0fGSz5DJcmVNebh6sD9HHDuBIgM_tSKPFJUY';
const secretKey = 'XNX3gHjpWlQ2JR165&xrcb6pcxkuJ2Aqw12SZsuu1kSriOCQC';

const jwtService = new JwtService({ secret: secretKey });

try {
  const decoded = jwtService.verify(token);
  console.log('El token es válido');
  console.log(decoded);
} catch (err) {
  console.error('El token no es válido');
}
