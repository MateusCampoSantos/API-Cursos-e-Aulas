import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { ProductResolver } from './graphql/resolver/products.resolver';
import { DatabaseModule } from '../database/database.module';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductsService } from '../services/products.service';
import { PurchasesService } from '../services/purchases.service';
import { PurchasesResolver } from './graphql/resolver/purchases.resolver';
import { CustomerService } from '..//services/customer.service';
import { CustomerResolver } from './graphql/resolver/customer.resolver';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
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
