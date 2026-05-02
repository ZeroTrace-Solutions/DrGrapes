import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import { Gender, PrismaClient, Role } from '@prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL || '',
});

const prisma = new PrismaClient({ adapter });

type SocialProviderDelegate = {
  findFirst: (args: {
    where: { name: string };
  }) => Promise<{ id: number } | null>;
  create: (args: { data: { name: string; url: string } }) => Promise<unknown>;
};

async function main() {
  console.log('Seeding database...');

  const medicalFaculties = [
    'Faculty of Medicine',
    'Faculty of Pharmacy',
    'Faculty of Dentistry',
    'Faculty of Nursing',
  ];

  const ensureMedicalFaculties = async () => {
    for (const facultyName of medicalFaculties) {
      const existingFaculty = await prisma.faculty.findFirst({
        where: { name: facultyName },
      });

      if (!existingFaculty) {
        await prisma.faculty.create({
          data: { name: facultyName },
        });
      }
    }
  };

  await ensureMedicalFaculties();

  let alex = await prisma.university.findFirst({
    where: { name: 'Alexandria University' },
  });

  if (!alex) {
    alex = await prisma.university.create({
      data: { name: 'Alexandria University' },
    });

    console.log('Created university:', alex);
  }

  const extraUniversities = [
    'Cairo University',
    'Mansoura University',
    'Ain Shams University',
    'Al-Azhar University',
  ];

  for (const universityName of extraUniversities) {
    const existingUniversity = await prisma.university.findFirst({
      where: { name: universityName },
    });

    if (!existingUniversity) {
      await prisma.university.create({
        data: { name: universityName },
      });
      console.log(`Created university: ${universityName}`);
    } else {
      console.log(`University already exists: ${universityName}`);
    }
  }

  const providers = [
    { name: 'Facebook', url: 'https://facebook.com/' },
    { name: 'Instagram', url: 'https://instagram.com/' },
    { name: 'X', url: 'https://x.com/' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/' },
  ];

  const socialProvider =
    prisma.socialMediaProvider as unknown as SocialProviderDelegate;

  const membershipLevel = 'MEMBERSHIP' as const;

  for (const provider of providers) {
    const existingProvider = await socialProvider.findFirst({
      where: { name: provider.name },
    });

    if (!existingProvider) {
      await socialProvider.create({
        data: provider,
      });
      console.log(`Created social media provider: ${provider.name}`);
    } else {
      console.log(`Social media provider already exists: ${provider.name}`);
    }
  }

  console.log('Checked/Created Social Media Providers.');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@DrGrapes.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  const medicineFaculty = await prisma.faculty.findFirst({
    where: { name: 'Faculty of Medicine' },
  });

  if (!existingAdmin) {
    // Hash the password so your NestJS login strategy works
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'Password123!',
      10,
    );

    await prisma.user.create({
      data: {
        full_name: 'ZeroTrace Solutions',
        username: 'zt_admin',
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
        level: membershipLevel,
        DateOfBirth: new Date('1998-01-01T00:00:00Z'),
        gender: Gender.MALE,
        isEmailVerified: true,
        hashedRefreshToken: null,
        tokenVersion: 0,
        userInfo: {
          create: {
            address: 'Alexandria, Egypt',
            phoneNumber: '+201000000000', // Remember this is @unique
            universityId: alex.id,
            facultyId: medicineFaculty?.id,
          },
        },
      },
    });
    console.log(
      `Admin user created: ${adminEmail} | Password: ${process.env.ADMIN_PASSWORD}`,
    );
  } else {
    console.log('Admin user already exists. Skipping creation.');
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
