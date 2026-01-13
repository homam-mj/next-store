import Container from '../global/Container';
import CartButton from './CartButton';
import DarkMode from './DarkMode';
import LinksDropdown from './LinksDropdown';
import Logo from './Logo';
import NavSearch from './NavSearch';
import { Suspense } from 'react';
function Navbar() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/navbar/Navbar.tsx:9',message:'Navbar component rendering started',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion
  
  try {
    return (
      <nav className='border-b'>
        <Container className='flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4'>
          <Logo />
          <Suspense>
            <NavSearch />
          </Suspense>
          <div className='flex gap-4 items-center'>
            <CartButton />
            <DarkMode />
            <LinksDropdown />
          </div>
        </Container>
      </nav>
    );
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/6fccf632-d8cd-4ca1-ba9f-13c486cf049d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/navbar/Navbar.tsx:25',message:'Navbar error caught',data:{errorMessage:error instanceof Error?error.message:String(error)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    throw error;
  }
}
export default Navbar;
