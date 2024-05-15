
interface EmployeeData
{
    loggedEmployee : 
    {
        employee  : string | undefined ;
        employeeId : number | undefined;
        manager : string | undefined;
        managerId : number | undefined;
        company : string | undefined;
        famCode : string | undefined;
        location : string | undefined;
        costCenter : string | undefined;
        empNo : string | undefined;    
    },
    isEmp : boolean | undefined;
}

const InitialEmpData: EmployeeData = 
{
    loggedEmployee: 
    {
        employee: undefined,
        manager: undefined,
        company: undefined,
        famCode: undefined,
        location: undefined,
        costCenter: undefined,
        empNo: undefined,
        employeeId: undefined,
        managerId: undefined
    }
    ,
    isEmp : false
}

export { EmployeeData , InitialEmpData};