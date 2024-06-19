import { Global, Module } from '@nestjs/common';

const register = [];

@Global()
@Module({
  providers: register,
  exports: register,
})
export class ConfigurationModule {}
