import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { DatabaseModule } from '../database/database.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { StudentResolver } from './graphql/resolvers/student.resolver';
import { CourseResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentService } from '../services/students.service';
import { CourseService } from '../services/courses.service';
import { EnrollmentService } from '../services/enrollments.service';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.qql'),
    }),
  ],
  providers: [
    StudentResolver,
    CourseResolver,
    EnrollmentsResolver,
    StudentService,
    CourseService,
    EnrollmentService,
  ],
})
export class HttpModule {}
