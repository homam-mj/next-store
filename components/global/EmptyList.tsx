import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

function EmptyList({
  heading = 'No items in cart.',
  className,
  btnText = 'Keep Shopping',
  href = '/products',
}: {
  heading?: string;
  className?: string;
  btnText?: string;
  href?: string;
}) {
  return (
    <div className={className}>
      <h2 className={cn('text-xl md:text-2xl font-bold', className)}>{heading}</h2>
      <Button asChild className='mt-4 capitalize' size='lg'>
        <Link href={href}>{btnText}</Link>
      </Button>
    </div>
  );
}
export default EmptyList;
