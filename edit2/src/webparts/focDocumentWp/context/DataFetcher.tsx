import * as React from 'react';
import fetchLoggedInUser from '../services/api/fetchLoggedInUserAPI';
import { useDataContext } from './DataTracker';
import fetchEmployee from '../services/api/fetchEmployeeAPI';
import { getSP } from '../util/getSPUtil';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import fetchDataFromMultipleLists from '../services/api/fetchDropDownsAPI';

const DataFetcherContext = React.createContext<{ context: any}>
    ({
        context: undefined
    });

export const useDataFetcherContext = (param:any) => 
{
    const { context } = React.useContext(DataFetcherContext);

    const value1 = 'string1';
    const value2 = 'string2';

    const function22 = () => {
        console.log("Params",param.name)
    }

    const obj = {
        contextNew : context,
        val1 : value1,
        val2 : value2,
        fun1 : function22
    }

    if (!context) 
    {
        throw new Error('useDataFetcherContext must be used within a DataFetcher ');
    }
    return obj;
};

export const DataFetcher: React.FC<{ context: any }> = ({ children, context }) => 
{
    // import methods from DataTracker to update the respective fields
    const { updateEmpData, updateDropDowns , updateField } = useDataContext();

    const fetchCurrentEmpData = async () => 
    {
        if (!context) 
        {
            console.log('no context found in DataFetcher', context);
        }
        try {
            const sp = getSP(context);
            const currentUser = await fetchLoggedInUser(sp);
            if (currentUser) 
            {
                // check and fetch all the data for the current User
                const currentEmp = await fetchEmployee({ currentUser: currentUser, sp: sp });
                if (currentEmp) 
                {
                    updateEmpData({
                        loggedEmployee:
                        {
                            employee: currentEmp.loggedEmployee.employee,
                            employeeId : currentEmp.loggedEmployee.employeeId,
                            manager: currentEmp.loggedEmployee.manager,
                            managerId: currentEmp.loggedEmployee.managerId,
                            company: currentEmp.loggedEmployee.company,
                            famCode: currentEmp.loggedEmployee.famCode,
                            location: currentEmp.loggedEmployee.location,
                            costCenter: currentEmp.loggedEmployee.costCenter,
                            empNo: currentEmp.loggedEmployee.empNo,
                        },
                        isEmp: currentEmp.isEmp
                    }),

                    // user person type column updates with the authenticated Id
                    updateField("userDetected",currentEmp.loggedEmployee.employeeId);
                    updateField("manager",currentEmp.loggedEmployee.managerId);
                    updateField("company",currentEmp.loggedEmployee.company);
                    updateField("FAMCode",currentEmp.loggedEmployee.famCode);
                    updateField("location",currentEmp.loggedEmployee.location);
                    updateField("costCenter",currentEmp.loggedEmployee.costCenter);
                    updateField("employeeNo",currentEmp.loggedEmployee.empNo);
                }
                else 
                {
                    console.log('no data in currentEmp', currentEmp);
                }
                const fetchedDropDownOptions: any = await fetchDataFromMultipleLists(sp);
                if (fetchedDropDownOptions) 
                {
                    // Update the state with the fetched drop-down options
                    updateDropDowns({
                        famCode: fetchedDropDownOptions.famCode,
                        bussinessLine: fetchedDropDownOptions.bussinessLine,
                        region: fetchedDropDownOptions.region,
                        classification: fetchedDropDownOptions.classification,
                        typeofFoc: fetchedDropDownOptions.typeofFoc
                    });
                }
                else {
                    console.error('Error fetching drop-down options.');
                }

                const generatedUniqueId = (currentUser.Title ? (currentUser.Title).substring(0, 4): '') + ("-") + (Math.floor(1000 + Math.random() * 9000).toString());
                // const generatedUniqueId = userIdPrefix + randomSuffix;

                updateField("docId",generatedUniqueId)

            }
        }
        catch (error) {
            console.error('Error fetching current user data:', error);
        }
    };

    React.useEffect(() => {
        fetchCurrentEmpData();
    }, []);

    return (
        <DataFetcherContext.Provider value={{ context }}>
            {children}
        </DataFetcherContext.Provider>
    );
};
