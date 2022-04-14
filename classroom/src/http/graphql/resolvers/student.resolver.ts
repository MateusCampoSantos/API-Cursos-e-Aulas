import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { EnrollmentService } from '../../..//services/enrollments.service';
import { StudentService } from '../../..//services/students.service';
import { Student } from '../models/student';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentService.listEnrollmentsByStudent(student.id);
  }
}
