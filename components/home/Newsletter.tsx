'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

function Newsletter() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({ description: 'Thank you for subscribing to our newsletter!' });
    };

    return (
        <section className='mt-24'>
            <div className='bg-muted p-8 md:p-14 rounded-xl text-center max-w-4xl mx-auto'>
                <h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-4'>
                    Subscribe to our newsletter
                </h2>
                <p className='text-lg leading-8 text-muted-foreground mb-8'>
                    Get the latest products, exclusive offers, and news straight to your
                    inbox.
                </p>
                <form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto' onSubmit={handleSubmit}>
                    <Input
                        type='email'
                        placeholder='Enter your email address'
                        className='h-12'
                        required
                    />
                    <Button size='lg' className='h-12' type='submit'>
                        Subscribe
                    </Button>
                </form>
            </div>
        </section>
    );
}
export default Newsletter;
