import * as React from 'react';
import { initialUserData } from '../interfaces/IObjectUserData';
import { EmployeeData, InitialEmpData } from '../interfaces/IEmployeeData';
import DataContextProps from '../interfaces/IDataContextProps';
import { DropDownCollection, InitialDropDowns } from '../interfaces/IDropDownCollections';

const DataContext = React.createContext<DataContextProps | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => 
{
    const [userData, setUserData] = React.useState(initialUserData);
    const [employeeData , setEmployeeData ] = React.useState(InitialEmpData);
    const [dropDowns , setDropDowns ] = React.useState(InitialDropDowns)

    // User Data handling
    const updateField = (fieldName: string, newValue: any) => 
    {
        setUserData((prevData) => 
        ({
            ...prevData,
            [fieldName]: newValue,
        }));
    };

    // Update Employee Data
    const updateEmpData = (newData: Partial<EmployeeData>): void => 
    {
        setEmployeeData((prevData) => 
        ({
            ...prevData,
            ...newData,
        }));
    };

    // Stores all the Drops Downs as one
    const updateDropDowns = (newData: Partial<DropDownCollection>): void => 
    {
        setDropDowns((prevData) => 
        ({
            ...prevData,
            ...newData,
        }));
    };



    return (
        <DataContext.Provider value={{ userData, updateField , employeeData , updateEmpData , dropDowns , updateDropDowns}}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = (): DataContextProps => 
{
    const context = React.useContext(DataContext);
    if (!context) 
    {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
