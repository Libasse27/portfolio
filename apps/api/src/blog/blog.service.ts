import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateBlogPostInput, UpdateBlogPostInput } from './blog.schemas';
import { slugify } from './slugify';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.blogPost.findMany({ orderBy: { datePublication: 'desc' } });
  }

  async findOne(slug: string) {
    const post = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!post) {
      throw new NotFoundException(`Article introuvable : ${slug}`);
    }
    return post;
  }

  async create(input: CreateBlogPostInput) {
    const slug = slugify(input.titre);
    const existing = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (existing) {
      throw new ConflictException(`Un article avec le slug "${slug}" existe déjà`);
    }
    return this.prisma.blogPost.create({ data: { ...input, slug } });
  }

  async update(slug: string, input: UpdateBlogPostInput) {
    await this.findOne(slug);
    return this.prisma.blogPost.update({ where: { slug }, data: input });
  }

  async remove(slug: string) {
    await this.findOne(slug);
    await this.prisma.blogPost.delete({ where: { slug } });
  }
}
