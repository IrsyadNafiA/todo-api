import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mysql",
    host: "192.168.1.5",
    port: 3306,
    username: "root",
    password: "irsyad123",
    database: "todo_db",
    autoLoadEntities: true,
    synchronize: true, // for dev
  }), TodoModule, AuthModule],
})

export class AppModule {}
