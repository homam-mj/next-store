'use client';

import FormInput from '../form/FormInput';
import FormContainer from '../form/FormContainer';
import { createOrderAction } from '@/utils/actions';
import { SubmitButton } from '../form/Buttons';
import SelectInput from '../form/SelectInput';
import { countries } from '@/utils/countries';

function AddressForm() {
    return (
        <FormContainer action={createOrderAction}>
            <div className='grid gap-4 md:grid-cols-2'>
                <FormInput name='firstName' type='text' label='First Name' />
                <FormInput name='lastName' type='text' label='Last Name' />
            </div>
            <FormInput name='address' type='text' label='Address' />
            <div className='grid gap-4 md:grid-cols-2'>
                <FormInput name='city' type='text' label='City' />
                <FormInput name='state' type='text' label='State' />
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
                <FormInput
                    name='zip'
                    type='text'
                    label='ZIP Code'
                    maxLength={5}
                    pattern='[0-9]*'
                    inputMode='numeric'
                    title='Please enter up to 5 numbers'
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, '').slice(0, 5);
                    }}
                />
                <FormInput name='country' type='text' label='Country' />
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
                <SelectInput
                    name='countryCode'
                    label='Country Code'
                    options={countries.map((c) => ({
                        label: `${c.name} (${c.phone})`,
                        value: c.code,
                    }))}
                    defaultValue={countries[0].code}
                />
                <FormInput
                    name='phone'
                    type='tel'
                    label='Phone Number'
                    maxLength={15}
                    pattern='[0-9]*'
                    inputMode='numeric'
                    title='Please enter only numbers'
                    onInput={(e) => {
                        const target = e.target as HTMLInputElement;
                        target.value = target.value.replace(/[^0-9]/g, '').slice(0, 15);
                    }}
                />
            </div>
            <SubmitButton text='Continue to Payment' className='w-full mt-4' />
        </FormContainer>
    );
}
export default AddressForm;
