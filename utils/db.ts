import { PrismaClient } from '@prisma/client';

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/db.ts:4',message:'db.ts module loading started',data:{hasDbUrl:Boolean(process.env.DATABASE_URL)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

// Validate DATABASE_URL early and provide a clear error message
const _dbUrl = process.env.DATABASE_URL;

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/db.ts:8',message:'DATABASE_URL validation check',data:{dbUrlPresent:Boolean(_dbUrl),dbUrlStartsWithPostgres:_dbUrl?.startsWith('postgres://')||_dbUrl?.startsWith('postgresql://')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

if (!_dbUrl || (!(_dbUrl.startsWith('postgres://') || _dbUrl.startsWith('postgresql://')))) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/db.ts:12',message:'DATABASE_URL validation failed - throwing error',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  throw new Error(
    'Missing or invalid DATABASE_URL. Ensure your `.env.local` contains a DATABASE_URL that starts with `postgres://` or `postgresql://` (for Supabase: Project → Settings → Database → Connection string).'
  );
}

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/db.ts:20',message:'DATABASE_URL validation passed, creating PrismaClient',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/db.ts:24',message:'db.ts module loaded successfully',data:{prismaCreated:Boolean(prisma)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
