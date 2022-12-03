import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import {plainToInstance,plainToClass} from 'class-transformer'
import { UserDto } from 'src/user/dtos/user.dto';
import { ClassConstructor } from 'src/utils/types';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto:ClassConstructor){}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    //logic to intercept incoming request
    console.log('I am runing before request');
    return next.handle().pipe(
      map((data:any) => {
        //logic to intercept outgoing response
        return plainToInstance(this.dto,data,{excludeExtraneousValues:true})
      }),
    );
  }
}
