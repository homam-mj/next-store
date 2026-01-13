import AddressForm from '@/components/checkout/AddressForm';
import CheckoutProgressBar from '@/components/checkout/CheckoutProgressBar';
import SectionTitle from '@/components/global/SectionTitle';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

async function AddressPage() {
    const { userId } = auth();
    if (!userId) redirect('/');

    return (
        <section>
            <CheckoutProgressBar currentStep='Address' />
            <SectionTitle text='Shipping Address' />
            <div className='border p-8 rounded-md mt-8 max-w-2xl mx-auto'>
                <AddressForm />
            </div>
        </section>
    );
}
export default AddressPage;
