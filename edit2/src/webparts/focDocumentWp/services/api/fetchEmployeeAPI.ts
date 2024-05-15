import { EmployeeData, InitialEmpData } from "../../interfaces/IEmployeeData";
import contextAndSp from "../../models/FetchEmployeeConfig";

const fetchEmployee = async (config: contextAndSp): Promise<EmployeeData | undefined> => 
{
    const { sp, currentUser } = config;

    try 
    {
        const filterQuery = `NameId eq ${currentUser.Id}`;

        const response = await sp.web.lists.getByTitle('Employees').items.filter(filterQuery)
            .select("Name/EMail,Name/Id,Manager/EMail,Manager/Id,Company/CompanyName,FAMCode/FAMCode0,Location/Location,CostCenter/CostCenter,EmpNo")
            .expand("Name,Manager,Company,FAMCode,Location,CostCenter")();

        const Employee = response[0].Name ? response[0].Name.EMail : null;
        const EmployeeId = response[0].Name ? response[0].Name.Id : null;
        const Manager = response[0].Manager ? response[0].Manager.EMail : null;
        const ManagerId = response[0].Manager ? response[0].Manager.Id : null;
        const Company = response[0].Company ? response[0].Company.CompanyName : null;
        const FamCode = response[0].FAMCode ? response[0].FAMCode.FAMCode0 : null;
        const Location = response[0].Location ? response[0].Location.Location : null;
        const CostCenter = response[0].CostCenter ? response[0].CostCenter.CostCenter : null;
        const EmpNo = response[0].EmpNo ? response[0].EmpNo : null;

        if (response && response.length > 0) 
        {
            const employeeData: EmployeeData =
            {
                loggedEmployee:
                {
                    employee : Employee,
                    employeeId: EmployeeId,
                    manager : Manager,
                    managerId: ManagerId,
                    company: Company,
                    famCode: FamCode,
                    location: Location,
                    costCenter: CostCenter,
                    empNo: EmpNo,
                },
                isEmp: true,
            };

            return employeeData;
        }
        else 
        {
            alert('No User found ... from fetchEmployee.ts')
            return InitialEmpData;
        }
    }
    catch (error) 
    {
        console.error('Error fetching employee data:', error);
        throw error;
    }
};

export default fetchEmployee;
