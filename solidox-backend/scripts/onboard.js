const { PrismaClient } = require('@prisma/client');

// A utility script to onboard an Organization to SoliDoX

const db = new PrismaClient();

// Fill in the details of the organization
const org = {
  name: 'ACME Inc.',
  address: '0xe36AC95CC3b06b2070272108F299d01FE80fC012',
  usedStorage: 0,
  availableStorage: 1000000000,
};

// Create the organization
db.organization
  .create({
    data: org,
  })
  .then((res) => {
    console.log(`Created organization ${res.name} with id ${res.id}`);
  });
