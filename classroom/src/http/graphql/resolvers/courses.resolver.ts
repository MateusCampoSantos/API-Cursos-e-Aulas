import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { CourseService } from '../../../services/courses.service';
import { CreateCourseInput } from '../inputs/create-course-inputs';
import { Course } from '../models/course';
import { StudentService } from '../../../services/students.service';
import { EnrollmentService } from 'src/services/enrollments.service';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private coursesService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  courses() {
    return this.coursesService.listAllCourses();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.getStudentByAuthUserId(user.sub);

    if (!student) {
      throw new Error('Student not found');
    }

    const enrollment = await this.enrollmentService.getByCOurseAndStudentId({
      courseId: id,
      studentId: student.id,
    });

    if (!enrollment) {
      throw new UnauthorizedException();
    }

    return this.coursesService.getCourseById(id);
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
