import LoadingContainer from '@/components/global/LoadingContainer';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Hero from '@/components/home/Hero';
import Newsletter from '@/components/home/Newsletter';
import { Suspense } from 'react';

// Force dynamic rendering because Navbar uses auth() which uses headers()
export const dynamic = 'force-dynamic';

function HomePage() {
  return (
    <>
      <Hero />

      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
      <Newsletter />
    </>
  );
}
export default HomePage;
