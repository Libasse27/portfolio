import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service';
import { BlogService } from './blog.service';

const samplePost = {
  slug: 'mon-article',
  titre: 'Mon article',
  extrait: 'Résumé',
  datePublication: '2026-08-08',
  dateMiseAJour: null,
  theme: 'dev' as const,
  tags: ['nextjs'],
  corps: '## Titre\n\nContenu.',
};

function createPrismaMock() {
  return {
    blogPost: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };
}

describe('BlogService', () => {
  let service: BlogService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(async () => {
    prisma = createPrismaMock();
    const module = await Test.createTestingModule({
      providers: [BlogService, { provide: PrismaService, useValue: prisma }],
    }).compile();
    service = module.get(BlogService);
  });

  it('findOne lève NotFoundException si le slug est inconnu', async () => {
    prisma.blogPost.findUnique.mockResolvedValue(null);
    await expect(service.findOne('inconnu')).rejects.toThrow('Article introuvable');
  });

  it('findOne retourne l’article existant', async () => {
    prisma.blogPost.findUnique.mockResolvedValue(samplePost);
    await expect(service.findOne('mon-article')).resolves.toEqual(samplePost);
  });

  it('create dérive le slug du titre et refuse un doublon', async () => {
    prisma.blogPost.findUnique.mockResolvedValue(samplePost);
    const { titre, extrait, datePublication, theme, tags, corps } = samplePost;
    await expect(
      service.create({ titre, extrait, datePublication, theme, tags, corps }),
    ).rejects.toThrow('existe déjà');
  });

  it('create insère un nouvel article avec le slug dérivé', async () => {
    prisma.blogPost.findUnique.mockResolvedValue(null);
    prisma.blogPost.create.mockResolvedValue(samplePost);
    const { titre, extrait, datePublication, theme, tags, corps } = samplePost;
    await service.create({ titre, extrait, datePublication, theme, tags, corps });
    expect(prisma.blogPost.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ slug: 'mon-article' }),
    });
  });
});
