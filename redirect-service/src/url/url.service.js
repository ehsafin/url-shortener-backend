const { PrismaClient } = require("@prisma/client");
const redis = require("../redis/redisClient");
const generateCode = require("../utils/generateCode");
const { nanoid } = require("nanoid");

const prisma = new PrismaClient();

exports.getOriginalUrl = async (shortCode) => {
  let originalUrl = await redis.get(shortCode);
  if (originalUrl) return originalUrl;

  const result = await prisma.url.findUnique({ where: { shortCode } });
  originalUrl = result?.originalUrl || null;
  if (originalUrl) redis.set(shortCode, originalUrl);
  return originalUrl;
};
