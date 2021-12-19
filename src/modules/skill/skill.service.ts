import { Injectable } from '@nestjs/common';
import { StatusResponse } from 'src/common/dto/status-response.dto';
import { SkillRepository } from 'src/repositories/skill.repository';
import { UserSkillRepository } from 'src/repositories/user-skill.repository';
import { SkillListRequest } from './dto/skill-list-request.dto';
import { SkillManageRequest } from './dto/skill-manage-request.dto';
import { SkillRequest } from './dto/skill-request.dto';
import { SkillResponse } from './dto/skill-response.dto';

@Injectable()
export class SkillService {
  constructor(private skillRepository: SkillRepository, private userSkillRepository: UserSkillRepository) {}

  async create(skillListRequest: SkillRequest): Promise<SkillResponse> {
    const skill = await this.skillRepository.create(skillListRequest);
    return new SkillResponse(skill);
  }

  async getList(skillListRequest: SkillListRequest): Promise<SkillResponse[]> {
    const { q, size, userId } = skillListRequest;

    const pagination = { take: size };
    const whereOption = [];
    if (userId != null) {
      whereOption.push({ UserSkill: { some: { User: { id: userId } } } });
    }

    if (q != null) {
      whereOption.push({ name: { startsWith: q } });
    }

    const skillList = await this.skillRepository.findAllByWhereOptionOrderByOrderOption(pagination, whereOption);
    const skillListResponse: SkillResponse[] = [];
    skillList.map((skill) => skillListResponse.push(new SkillResponse(skill)));

    return skillListResponse;
  }

  async update(userId: number, data: SkillManageRequest): Promise<StatusResponse> {
    await this.userSkillRepository.deleteAll(userId);
    const bulkData: Array<{ userId: number; skillId: number }> = data.skillList.map((skill) => {
      return { userId, skillId: skill };
    });
    await this.userSkillRepository.createAll(bulkData);

    return new StatusResponse(true);
  }
}
