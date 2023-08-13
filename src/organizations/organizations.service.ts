import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  /***
   * create a new organization
   */
  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = await this.findOneByName(
      createOrganizationDto.organization,
    );

    if (organization) {
      throw new HttpException(
        'The organization already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.organizationRepository.save({
      ...createOrganizationDto,
      id: uuidv4(),
    });
  }

  /***
   * search organizations (All, One by id, One by name)
   */
  async findAll() {
    return await this.organizationRepository.find();
  }

  async findOne(id: string) {
    return await this.organizationRepository.findOneBy({ id });
  }

  async findOneByName(organization: string) {
    return await this.organizationRepository.findOneBy({ organization });
  }

  /***
   * update organizations
   */
  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = this.findOne(id);

    if (!organization) {
      throw new HttpException('Organization not found', HttpStatus.NOT_FOUND);
    }

    return await this.organizationRepository.update(id, updateOrganizationDto);
  }

  /***
   * remove organizations (soft)
   */
  async remove(id: string) {
    return await this.organizationRepository.softDelete({ id });
  }

  /***
   * recover organization
   */
  async recover(id: string) {
    return await this.organizationRepository.restore({ id });
  }
}
