import { ApiProperty } from '@nestjs/swagger';
import { Skill } from '@prisma/client';

export class SkillResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  constructor(skill: Skill) {
    this.id = skill.id;
    this.name = skill.name;
  }
}
