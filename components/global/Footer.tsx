import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

function Footer() {
    return (
        <footer className='py-8 bg-muted'>
            <div className='container mx-auto px-8 flex flex-col items-center justify-between gap-4 md:flex-row'>
                <div className='flex gap-x-6 text-sm font-medium'>
                    <Link href='/' className='hover:text-primary transition-colors'>
                        Home
                    </Link>
                    <Link href='/products' className='hover:text-primary transition-colors'>
                        Products
                    </Link>
                    <Link href='/about' className='hover:text-primary transition-colors'>
                        About
                    </Link>
                </div>
                <p className='text-muted-foreground text-sm uppercase tracking-wider'>
                    &copy; {new Date().getFullYear()} Next Store
                </p>
            </div>
        </footer>
    );
}
export default Footer;
