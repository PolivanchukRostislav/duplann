import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { Works } from './works/works.entity';
import { WorksController } from './works/works.controller';
import { WorksService } from './works/works.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456789',
      database: 'test3',
      entities: [User, Works,],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Works,]),
    JwtModule.register({
      secret: 'duplom',
      signOptions: { expiresIn: '1d' },
    }),
    MyLoggerModule,
  ],
  controllers: [AppController, WorksController],
  providers: [AppService, WorksService],
})
export class AppModule {}
