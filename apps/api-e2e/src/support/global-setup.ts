import { existsSync, unlinkSync } from 'fs';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';
import path from 'path';


module.exports = async function () {
  const testDBPath = path.resolve(__dirname, '../../../../prisma/test.db');

  if (existsSync(testDBPath)) {
    unlinkSync(testDBPath);
  }

  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  } finally {
    await prisma.$disconnect();
  }
};
