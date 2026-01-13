import { Button } from '@/components/ui/button';
import Link from 'next/link';

function NotFoundPage() {
    return (
        <section className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
            <h1 className='text-9xl font-extrabold text-primary'>404</h1>
            <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mt-4 max-w-2xl'>
                Page Not Found
            </h2>
            <p className='text-lg leading-8 text-muted-foreground mt-6 max-w-lg'>
                Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for. It might
                have been moved or doesn&rsquo;t exist.
            </p>
            <div className='mt-10'>
                <Button asChild size='lg'>
                    <Link href='/'>Go Back Home</Link>
                </Button>
            </div>
        </section>
    );
}
export default NotFoundPage;
