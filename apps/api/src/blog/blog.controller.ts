import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  createBlogPostSchema,
  updateBlogPostSchema,
  type CreateBlogPostInput,
  type UpdateBlogPostInput,
} from '@portfolio/validations';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findOne(slug);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(createBlogPostSchema))
  create(@Body() body: CreateBlogPostInput) {
    return this.blogService.create(body);
  }

  @Patch(':slug')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ZodValidationPipe(updateBlogPostSchema))
  update(@Param('slug') slug: string, @Body() body: UpdateBlogPostInput) {
    return this.blogService.update(slug, body);
  }

  @Delete(':slug')
  @UseGuards(JwtAuthGuard)
  remove(@Param('slug') slug: string) {
    return this.blogService.remove(slug);
  }
}
