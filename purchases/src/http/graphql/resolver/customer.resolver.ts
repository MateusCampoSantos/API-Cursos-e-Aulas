import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';
import { PurchasesService } from 'src/services/purchases.service';
import { AuthUser, CurrentUser } from '../../../http/auth/current-user';
import { CustomerService } from '../../../services/customer.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomerService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customerService.getCustomerByAuthUserId(reference.authUserId);
  }
}
