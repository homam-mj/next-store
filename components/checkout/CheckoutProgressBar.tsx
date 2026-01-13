import { cn } from '@/lib/utils';
import Link from 'next/link';

type CheckoutStep = {
    id: string;
    label: string;
    href: string;
    active: boolean;
};

const steps: CheckoutStep[] = [
    { id: '1', label: 'Cart', href: '/cart', active: false },
    { id: '2', label: 'Address', href: '/checkout/address', active: false },
    { id: '3', label: 'Payment', href: '/checkout', active: false },
];

function CheckoutProgressBar({ currentStep }: { currentStep: string }) {
    return (
        <div className='flex justify-center items-center py-8'>
            <div className='flex items-center gap-x-2'>
                {steps.map((step, index) => {
                    const isActive = step.label.toLowerCase() === currentStep.toLowerCase();
                    const isCompleted = index < steps.findIndex(s => s.label.toLowerCase() === currentStep.toLowerCase());

                    return (
                        <div key={step.id} className='flex items-center'>
                            <Link
                                href={step.href}
                                className={cn(
                                    'flex items-center gap-x-2 text-sm font-medium transition-colors',
                                    isActive ? 'text-primary' : 'text-muted-foreground',
                                    isCompleted ? 'text-primary' : '',
                                    // Disable payment link if not on payment step (simplification)
                                    step.label === 'Payment' && !isActive ? 'pointer-events-none' : ''
                                )}
                            >
                                <div className={cn(
                                    'w-8 h-8 rounded-full flex items-center justify-center border-2',
                                    isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground',
                                    isCompleted ? 'border-primary bg-primary text-primary-foreground' : ''
                                )}>
                                    {step.id}
                                </div>
                                <span>{step.label}</span>
                            </Link>
                            {index < steps.length - 1 && (
                                <div className={cn('w-8 h-[2px] mx-2', isCompleted ? 'bg-primary' : 'bg-muted-foreground')} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default CheckoutProgressBar;
