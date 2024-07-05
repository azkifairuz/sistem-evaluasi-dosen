import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function dosenTestAcoount() {
  const hashedPassword = await bcrypt.hash('testaccount', 10);
  const dosenData = await prisma.dosen.create({
    data: {
      nama: 'Dr. John Doe',
      alamat_surel: 'johndoe@example.com',
      jabatan_akademik: 'Professor',
      jenis_kelamin: 'Laki-laki',
      jenjang_pendidikan: 'S3',
      nidn: '123456789',
      no_telephone: '081234567890',
      program_studi: 'Teknik Informatika',
      tanggal_lahir: new Date('1980-01-01'),
    },
  });

  const dosenTestAcoount = await prisma.account.create({
    data: {
      uuid: uuidv4(),
      username: dosenData.nama,
      password: hashedPassword,
      token: '',
    },
  });

  await prisma.dosenAccount.create({
    data: {
      account_id: dosenTestAcoount.uuid,
      nidn: dosenData.nidn,
    },
  });
}

dosenTestAcoount()
  .then(() => {
    console.log('Seed data created successfully');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
