import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import configuration, { IConfig } from 'src/config/configuration';
import { IFheAgentVerifierController } from './IFheAgent.controller';
import { ApiKeyStrategy } from 'src/auth/apikey.strategy';
import { AuthService } from 'src/auth/auth.service';
import { IFheAgentVerifierService } from './IFheAgent.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    // add connection to a database
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (config: ConfigService<IConfig>) =>
    //     config.get('typeOrmModuleOptions'),
    //   inject: [ConfigService],
    // }),
    AuthModule,
  ],
  controllers: [IFheAgentVerifierController],
  providers: [ApiKeyStrategy, AuthService, IFheAgentVerifierService],
})
export class IFheAgentVerifierServerModule {}
