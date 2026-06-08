import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@ApiSchema({
  name: 'User Response',
})
export class UserResponseDto {
  @ApiProperty({
    description: 'The username from seller/buyer',
    example: 'John Doe',
  })
  @Expose()
  username!: string;
}
