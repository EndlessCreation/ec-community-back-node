import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty()
  status: boolean;

  constructor(status: boolean) {
    this.status = status;
  }
}
