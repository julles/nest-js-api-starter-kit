import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeederEntity } from '../entities/seeder.entity';
import { Repository } from 'typeorm';
import { SeederInterface } from './seeder.interface';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(SeederEntity)
    private seederRepository: Repository<SeederEntity>,
  ) {}

  registers(): SeederInterface[] {
    return [];
  }

  async run() {
    for (const seeder of this.registers()) {
      const seederName = seeder.seederName;

      const seederLog = await this.seederRepository.findOne({
        where: { seederName: seederName },
      });

      if (seederLog) {
        console.log(
          `Seeder "${seederName}" sudah dijalankan sebelumnya. skipping...`,
        );
        continue;
      }

      console.log(`Menjalankan seeder "${seederName}"...`);

      await seeder.run();

      const newSeederLog = this.seederRepository.create({
        seederName: seederName,
      });

      await this.seederRepository.save(newSeederLog);

      console.log(`Seeder "${seederName}" selesai dijalankan.`);
    }
  }
}
