
import { PrismaClient } from "$/generated/prisma";



const prismaClientSignleton = () => {
    return new PrismaClient()
}

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSignleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSignleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;