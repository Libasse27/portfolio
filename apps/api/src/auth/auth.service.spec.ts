import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

vi.mock('bcrypt', () => ({ compare: vi.fn() }));

const adminUser = {
  id: 'user_1',
  email: 'libaase@example.test',
  passwordHash: 'hash',
  createdAt: new Date(),
};

describe('AuthService', () => {
  let service: AuthService;
  let prisma: { adminUser: { findUnique: ReturnType<typeof vi.fn> } };
  let jwt: { signAsync: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    prisma = { adminUser: { findUnique: vi.fn() } };
    jwt = { signAsync: vi.fn().mockResolvedValue('signed-jwt') };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();
    service = module.get(AuthService);
    vi.mocked(bcrypt.compare).mockReset();
  });

  it('lève UnauthorizedException si l’email est inconnu', async () => {
    prisma.adminUser.findUnique.mockResolvedValue(null);
    await expect(service.login({ email: 'inconnu@example.test', password: 'x' })).rejects.toThrow(
      'Identifiants invalides',
    );
  });

  it('lève UnauthorizedException si le mot de passe ne correspond pas', async () => {
    prisma.adminUser.findUnique.mockResolvedValue(adminUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(false as never);
    await expect(service.login({ email: adminUser.email, password: 'mauvais' })).rejects.toThrow(
      'Identifiants invalides',
    );
  });

  it('retourne un accessToken si les identifiants sont valides', async () => {
    prisma.adminUser.findUnique.mockResolvedValue(adminUser);
    vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
    await expect(service.login({ email: adminUser.email, password: 'bon' })).resolves.toEqual({
      accessToken: 'signed-jwt',
    });
    expect(jwt.signAsync).toHaveBeenCalledWith({ sub: adminUser.id, email: adminUser.email });
  });
});
