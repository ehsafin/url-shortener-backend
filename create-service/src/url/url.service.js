const { PrismaClient } = require("@prisma/client");
const redis = require("../redis/redisClient");
const generateCode = require("../utils/generateCode");
const { nanoid } = require("nanoid");

const prisma = new PrismaClient();

exports.createShortUrl = async (originalUrl, alias, expirationTime) => {
  let shortCode = alias;

  const expiration = expirationTime ? new Date(expirationTime) : null;

  if (!shortCode) {
    let isUnique = false;

    while (!isUnique) {
      shortCode = nanoid();
      const exists = await prisma.url.findUnique({ where: { shortCode } });
      isUnique = !exists;
    }
  } else {
    const existing = await prisma.url.findUnique({ where: { shortCode } });
    if (existing) throw new Error("Alias already in use");
  }

  await prisma.url.create({
    data: {
      shortCode,
      originalUrl,
      expirationTime: expiration,
    },
  });

  await redis.set(shortCode, originalUrl);
  return `${process.env.BASE_URL}/${shortCode}`;
};

// exports.getOriginalUrl = async (shortCode) => {
//   let originalUrl = await redis.get(shortCode);
//   if (originalUrl) return originalUrl;

//   const result = await prisma.url.findUnique({ where: { shortCode } });
//   originalUrl = result?.originalUrl || null;
//   if (originalUrl) redis.set(shortCode, originalUrl);
//   return originalUrl;
// };
