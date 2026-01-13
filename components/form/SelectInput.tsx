import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type SelectInputProps = {
    name: string;
    label?: string;
    defaultValue?: string;
    options: { label: string; value: string }[];
};

function SelectInput({ name, label, defaultValue, options }: SelectInputProps) {
    return (
        <div className='mb-2'>
            <Label htmlFor={name} className='capitalize'>
                {label || name}
            </Label>
            <Select defaultValue={defaultValue || options[0].value} name={name} required>
                <SelectTrigger id={name}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((item) => {
                        return (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
        </div>
    );
}
export default SelectInput;
