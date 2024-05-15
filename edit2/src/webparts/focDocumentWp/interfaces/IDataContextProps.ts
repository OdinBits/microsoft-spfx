import { DropDownCollection } from "./IDropDownCollections";
import { EmployeeData } from "./IEmployeeData";
import { UserData } from "./IObjectUserData";



interface DataContextProps 
{
    userData : UserData,
    updateField: (fieldName: string, newValue: any) => void,

    employeeData: EmployeeData,
    updateEmpData: (newData: Partial<EmployeeData>) => void;

    dropDowns: DropDownCollection,
    updateDropDowns: (newData: Partial<DropDownCollection>) => void;
}

export default DataContextProps;