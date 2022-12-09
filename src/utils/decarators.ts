import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/seriealize.interceptor';
import { ClassConstructor } from './types';

export const Serialize = (dto: ClassConstructor) =>
  UseInterceptors(new SerializeInterceptor(dto));
