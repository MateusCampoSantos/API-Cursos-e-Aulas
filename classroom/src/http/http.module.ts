import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { TestResolver } from '../test/test.resolver';
import { DatabaseModule } from '../database/database.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.qql'),
    }),
  ],
  providers: [TestResolver],
})
export class HttpModule {}
