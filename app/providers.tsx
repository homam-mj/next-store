'use client';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/toaster';
function Providers({ children }: { children: React.ReactNode }) {
  // #region agent log
  if(typeof window!=='undefined'){fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/providers.tsx:5',message:'Providers client component rendering',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});}
  // #endregion
  
  try {
    return (
      <>
        <Toaster />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </>
    );
  } catch (error) {
    // #region agent log
    if(typeof window!=='undefined'){fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/providers.tsx:20',message:'Providers error caught',data:{errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});}
    // #endregion
    throw error;
  }
}
export default Providers;
