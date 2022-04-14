import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { ProductResolver } from './graphql/resolver/products.resolver';
import { DatabaseModule } from '../database/database.module';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { ProductsService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { PurchasesResolver } from './graphql/resolver/purchases.resolver';
import { CustomerService } from '..//services/customer.service';
import { CustomerResolver } from './graphql/resolver/customer.resolver';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    MessagingModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.qql'),
    }),
  ],
  providers: [
    ProductResolver,
    ProductsService,
    PurchasesService,
    PurchasesResolver,
    CustomerService,
    CustomerResolver,
  ],
})
export class HttpModule {}
