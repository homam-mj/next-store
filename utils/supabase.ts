import { createClient } from '@supabase/supabase-js';

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/supabase.ts:3',message:'supabase.ts module loading started',data:{hasSupabaseUrl:Boolean(process.env.SUPABASE_URL),hasSupabaseKey:Boolean(process.env.SUPABASE_KEY)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

const bucket = 'main-bucket';

// Validate SUPABASE_URL and SUPABASE_KEY early with a clear error message
const _supabaseUrl = process.env.SUPABASE_URL;
const _supabaseKey = process.env.SUPABASE_KEY;

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/supabase.ts:10',message:'Supabase env vars validation check',data:{supabaseUrlValid:_supabaseUrl&&/^https?:\/\//i.test(_supabaseUrl),supabaseKeyPresent:Boolean(_supabaseKey&&_supabaseKey.length>0)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

if (!(_supabaseUrl && /^https?:\/\//i.test(_supabaseUrl))) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/supabase.ts:13',message:'SUPABASE_URL validation failed - throwing error',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  throw new Error(
    'Missing or invalid SUPABASE_URL. Set SUPABASE_URL to your Supabase project URL (e.g. https://<project>.supabase.co) in `.env.local`.'
  );
}
if (!(_supabaseKey && _supabaseKey.length > 0)) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/supabase.ts:19',message:'SUPABASE_KEY validation failed - throwing error',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  throw new Error('Missing SUPABASE_KEY. Add your Supabase anon/service key to `.env.local`.');
}

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/supabase.ts:23',message:'Supabase env vars validation passed, creating client',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

export const supabase = createClient(
  _supabaseUrl as string,
  _supabaseKey as string
);

// #region agent log
fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'utils/supabase.ts:26',message:'supabase.ts module loaded successfully',data:{supabaseClientCreated:Boolean(supabase)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: '3600' });
  if (!data) throw new Error('Image upload failed');
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string) => {
  const imageName = url.split('/').pop();
  if (!imageName) throw new Error('Invalid URL');
  return supabase.storage.from(bucket).remove([imageName]);
};
