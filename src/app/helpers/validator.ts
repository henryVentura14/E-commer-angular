import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ReValidator(reExp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const rex = reExp.test(control.value);
        return !rex ? { 'reExp': { value: control.value } } : null;
    };
}
