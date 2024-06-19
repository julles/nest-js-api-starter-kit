import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SeederModule } from './seeder/seeder.module';
import { SeederEntity } from './entities/seeder.entity';

const entities = [SeederEntity];

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> =>
        configService.get('typeormConnection'),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(entities),
    SeederModule,
  ],
  exports: [TypeOrmModule.forFeature(entities)],
  providers: [],
})
export class DatabaseModule {}
