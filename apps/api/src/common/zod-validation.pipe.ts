import { BadRequestException, Injectable, type PipeTransform } from '@nestjs/common';
import type { ZodSchema } from 'zod';

/**
 * Enveloppe un schéma Zod existant (`@portfolio/validations`) en pipe
 * NestJS, plutôt que de dupliquer les règles de validation avec des
 * décorateurs `class-validator` — MODULE 16.1 impose Zod comme validation
 * partagée client/serveur (ADR 0010 décision 5).
 */
@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      throw new BadRequestException(result.error.flatten());
    }
    return result.data;
  }
}
