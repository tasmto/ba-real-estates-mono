/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { PrismaClient } from '@prisma/client';
import { md5 } from 'hash-wasm';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.store.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.contactInfo.deleteMany();
  await prisma.role.deleteMany();
  await prisma.contractTemplate.deleteMany();
  await prisma.contractFile.deleteMany();

  await prisma.contractTemplate.create({
    data: {
      name: 'General straw hats rules',
      description: 'This is a contract template for the general rules of the straw hats',
      year: 2023,
      active: true,
      templateLink:
        'https://drive.google.com/file/d/19ch1beJLByKsIlm9Ct8w4dn3SdCrPp1K/view?usp=sharing'
    }
  });

  await prisma.contractTemplate.create({
    data: {
      name: 'Pirate king rules',
      description: 'This is a contract template for the rules of the pirate king',
      year: 2021,
      active: false,
      templateLink:
        'https://drive.google.com/file/d/19ch1beJLByKsIlm9Ct8w4dn3SdCrPp1K/view?usp=sharing'
    }
  });
  await prisma.contractTemplate.create({
    data: {
      name: 'Procedure for the new crew members',
      description: 'This is a contract template for the procedure of the new crew members',
      year: 2023,
      active: true,
      templateLink:
        'https://drive.google.com/file/d/19ch1beJLByKsIlm9Ct8w4dn3SdCrPp1K/view?usp=sharing'
    }
  });

  const allContractTemplates = await prisma.contractTemplate.findMany({
    select: { id: true }
  });

  await prisma.user.create({
    data: {
      name: 'Nico Robin',
      email: 'robin@strawhats.inc',
      passwordHash: await md5('onepiece'),
      isArchived: false,
      role: {
        create: {
          name: 'archaeologist',
          description:
            'An archaeologist, or scholar, is a particular type of historian who ventures out into the field to find ancient ruins and study them first-hand. They are interested in the cultures of lost civilizations.',
          contractTemplates: {
            connect: allContractTemplates
          }
        }
      },
      jobTitle: 'Archaeologist',
      contactInfo: {
        create: {
          phone: '1234567890',
          address: 'The Grand Line',
          telephone: '1234567890',
          personalEmail: 'robin@baroqueworks.org',
          businessEmail: 'robin@strawhats.inc',

          emergencyContact: 'nami the navigator',
          emergencyContactPhone: '1234567890',
          emergencyContactEmail: 'nami@strawhats.inc',
          emergencyContactAddress: 'The Grand Line'
        }
      },
      contracts: {
        create: [
          {
            template: {
              connect: {
                id: allContractTemplates[0].id
              }
            },
            fileLink:
              'https://drive.google.com/file/d/19ch1beJLByKsIlm9Ct8w4dn3SdCrPp1K/view?usp=sharing',
            isSigned: true,
            verified: true,
            signedAt: new Date('2021-01-01')
          },
          {
            template: {
              connect: {
                id: allContractTemplates[1].id
              }
            },
            fileLink:
              'https://drive.google.com/file/d/19ch1beJLByKsIlm9Ct8w4dn3SdCrPp1K/view?usp=sharing',
            isSigned: true,
            verified: true,
            signedAt: new Date('2021-01-02')
          },
          {
            template: {
              connect: {
                id: allContractTemplates[2].id
              }
            },
            fileLink:
              'https://drive.google.com/file/d/19ch1beJLByKsIlm9Ct8w4dn3SdCrPp1K/view?usp=sharing',
            isSigned: true,
            verified: true,
            signedAt: new Date('2021-01-03')
          }
        ]
      }
    }
  });

  const adminUser = await prisma.user.findFirst({
    where: { email: 'robin@strawhats.inc' },
    select: { id: true }
  });

  await prisma.user.create({
    data: {
      name: 'Toni toni chopper',
      email: 'chooper@strawhats.inc',
      passwordHash: await md5('onepiece'),
      isArchived: false,
      role: {
        create: {
          name: 'doctor',
          description:
            'A doctor is a person who practices medicine, which is concerned with promoting, maintaining, or restoring health through the study, diagnosis, prognosis and treatment of disease, injury, and other physical and mental impairments. Doctors examine patients; take medical histories; prescribe medications; and order, perform, and interpret diagnostic tests.',
          contractTemplates: {
            connect: allContractTemplates
          }
        }
      },
      jobTitle: 'Doctor',
      contactInfo: {
        create: {
          phone: '1234567890',
          address: 'The Grand Line',
          telephone: '1234567890',
          personalEmail: 'chooper@raindeer.org',
          businessEmail: 'chooper@strawhats.inc',

          emergencyContact: 'nami the navigator',
          emergencyContactPhone: '1234567890',
          emergencyContactEmail: 'nami@strawhats.inc',
          emergencyContactAddress: 'The Grand Line'
        }
      },
      manager: { connect: adminUser },
      contracts: {
        create: [
          {
            template: {
              connect: {
                id: allContractTemplates[0].id
              }
            },
            fileLink:
              'https://drive.google.com/file/d/19ch1beJLByKsIlm9Ct8w4dn3SdCrPp1K/view?usp=sharing',
            isSigned: true,
            verified: true,
            signedAt: new Date('2021-01-01')
          },
          {
            template: {
              connect: {
                id: allContractTemplates[1].id
              }
            },
            isSigned: false,
            verified: false
          },
          {
            template: {
              connect: {
                id: allContractTemplates[2].id
              }
            },
            isSigned: false,
            verified: false
          }
        ]
      }
    }
  });

  await prisma.user.create({
    data: {
      name: 'Nami the navigator',
      email: 'nami@strawhats.iinc',
      passwordHash: await md5('onepiece'),
      isArchived: false,
      role: {
        create: {
          name: 'navigator',
          description:
            "A ship's navigator is a person who is responsible for the safe navigation of a ship or boat. The navigator is responsible for the ship's position, course and speed, and for all navigational charts, publications and equipment on board.",
          contractTemplates: {
            connect: allContractTemplates
          }
        }
      },
      jobTitle: 'Navigator',
      contactInfo: {
        create: {
          phone: '1234567890',
          address: 'The Grand Line',
          telephone: '1234567890',
          personalEmail: 'nami@kokoyayi.vl',
          businessEmail: 'nami@strawhats.inc',

          emergencyContact: 'Robin the archaeologist',
          emergencyContactPhone: '1234567890',
          emergencyContactEmail: 'robin@strawhats.inc',
          emergencyContactAddress: 'The Grand Line'
        }
      },
      manager: { connect: adminUser },
      contracts: {
        create: [
          {
            template: {
              connect: {
                id: allContractTemplates[0].id
              }
            },
            isSigned: false,
            verified: false
          },
          {
            template: {
              connect: {
                id: allContractTemplates[1].id
              }
            },
            isSigned: false,
            verified: false
          },
          {
            template: {
              connect: {
                id: allContractTemplates[2].id
              }
            },
            isSigned: false,
            verified: false
          }
        ]
      }
    }
  });

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@mail.com',
      passwordHash: await md5('1234'),
      contactInfo: {
        create: {
          phone: '1234567890',
          address: 'The Grand Line',
          telephone: '1234567890',
          personalEmail: 'robweweqin@baroqueworks.org',
          businessEmail: 'robiewewen@strawhats.inc',

          emergencyContact: 'nami the navigator',
          emergencyContactPhone: '1234567890',
          emergencyContactEmail: 'nami@strawhats.inc',
          emergencyContactAddress: 'The Grand Line'
        }
      }
    }
  });
  await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane@mail.com',
      passwordHash: await md5('qwer'),
      contactInfo: {
        create: {
          phone: '1234567890',
          address: 'The Grand Line',
          telephone: '1234567890',
          personalEmail: 'robwqeqqwein@baroqueworks.org',
          businessEmail: 'robinwe@strawhats.inc',

          emergencyContact: 'nami the navigator',
          emergencyContactPhone: '1234567890',
          emergencyContactEmail: 'nami@strawhats.inc',
          emergencyContactAddress: 'The Grand Line'
        }
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'Brandon',
      lastName: 'Sanderson',
      books: {
        create: [
          { title: 'The Way of Kings', price: 12.98 },
          { title: 'Words of Radiance', price: 11.49 },
          { title: 'Oathbringer', price: 14.98 },
          { title: 'Rhythm of War', price: 16.49 },
          { title: 'Elantris', price: 9.99 },
          { title: 'The Emperor’s Soul', price: 9.99 },
          { title: 'Warbreaker', price: 9.99 },
          { title: 'The Hero of Ages', price: 13.99 },
          { title: 'Mistborn', price: 11.99 },
          { title: 'The Alloy of Law', price: 9.99 },
          { title: 'The Well of Ascension', price: 9.99 }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'Patrick',
      lastName: 'Rothfuss',
      books: {
        create: [
          { title: 'The Name of the Wind', price: 9.99 },
          { title: 'The Wise Man’s Fear', price: 9.99 }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'George R. R.',
      lastName: 'Martin',
      books: {
        create: [
          { title: 'A Game of Thrones', price: 9.99 },
          { title: 'A Clash of Kings', price: 9.99 },
          { title: 'A Storm of Swords', price: 9.99 },
          { title: 'A Feast for Crows', price: 9.99 },
          { title: 'A Dance with Dragons', price: 9.99 }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'J. R. R.',
      lastName: 'Tolkien',
      books: {
        create: [
          { title: 'The Fellowship of the Ring', price: 9.99 },
          { title: 'The Two Towers', price: 9.99 },
          { title: 'The Return of the King', price: 9.99 }
        ]
      }
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'Robert',
      lastName: 'Jordan',
      books: {
        create: [
          { title: 'The Eye of the World', price: 9.99 },
          { title: 'The Great Hunt', price: 9.99 },
          { title: 'The Dragon Reborn', price: 9.99 },
          { title: 'The Shadow Rising', price: 9.99 },
          { title: 'The Fires of Heaven', price: 9.99 },
          { title: 'Lord of Chaos', price: 9.99 },
          { title: 'A Crown of Swords', price: 9.99 },
          { title: 'The Path of Daggers', price: 9.99 },
          { title: 'Winter’s Heart', price: 9.99 },
          { title: 'Crossroads of Twilight', price: 9.99 },
          { title: 'Knife of Dreams', price: 9.99 },
          { title: 'The Gathering Storm', price: 9.99 },
          { title: 'Towers of Midnight', price: 9.99 },
          { title: 'A Memory of Light', price: 9.99 }
        ]
      }
    }
  });

  const storeIds: string[] = [];

  await prisma.store
    .create({ data: { name: 'London' }, select: { id: true } })
    .then(({ id }) => storeIds.push(id));
  await prisma.store
    .create({ data: { name: 'New York' }, select: { id: true } })
    .then(({ id }) => storeIds.push(id));
  await prisma.store
    .create({ data: { name: 'Sydney' }, select: { id: true } })
    .then(({ id }) => storeIds.push(id));
  await prisma.store
    .create({ data: { name: 'Berlin' }, select: { id: true } })
    .then(({ id }) => storeIds.push(id));
  await prisma.store
    .create({ data: { name: 'Tokyo' }, select: { id: true } })
    .then(({ id }) => storeIds.push(id));
  await prisma.store
    .create({ data: { name: 'Paris' }, select: { id: true } })
    .then(({ id }) => storeIds.push(id));

  const bookIds = await prisma.book
    .findMany({ select: { id: true } })
    .then((books) => books.map(({ id }) => id));

  for (const bookId of bookIds) {
    const selectedStoreIds: string[] = [];
    for (let i = 0; i < 3; i++) {
      const randomStoreId = storeIds[Math.floor(Math.random() * storeIds.length)];
      if (!selectedStoreIds.includes(randomStoreId)) {
        selectedStoreIds.push(randomStoreId);
      }
    }
    await prisma.book.update({
      where: { id: bookId },
      data: {
        stores: {
          connect: selectedStoreIds.map((id) => ({ id }))
        }
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
