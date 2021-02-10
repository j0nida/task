import { Model } from '../common/db';

export { default as EmployeesList } from './EmployeesList';
export { default as EmployeesForm } from './EmployeesForm';

export class Employees extends Model {
    static SCHEMA = {
        mode: 'extract',
        fields: {
            name: 'string|required',
            email: 'email|required',
            phone: 'string',
            secondPhone : "string",
            secondEmail : "email",
            position: 'string'
        }
    };

    permissions() {
        return [];
    }
}
