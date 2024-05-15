import * as React from 'react';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { useDataContext } from './DataTrackingContext';
import { getSP } from '../utils/getSPUtil';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";


export const AppForContext = React.createContext<{context:any}>({
    context: undefined
});

export const useDataFetcherContext = () => 
{
    const { context } = React.useContext(AppForContext);
    if (!context) 
    {
        throw new Error('useDataFetcherContext must be used within a DataFetcher ');
    }
    return { context };
};

export const AppProvider: React.FC<{ context: any }> = ({ children, context }) => 
{
    
    const { updateUserData } = useDataContext();

    const sp = getSP(context);
    const spHttpClient: SPHttpClient = context.spHttpClient;
    const fetchData = async (ItemId: string ): Promise<void> => 
    {

        try 
        {
            const itemId = parseInt(ItemId, 10);

            const apiUrl = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('View All Request')/items(${itemId})?$select=*,Requester/EMail,Requester/Title,Manager/EMail&$expand=Requester,Manager`;
            const response: SPHttpClientResponse = await spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
            
            const currentUser = await sp.web.currentUser();

            // console.log("currentUser id data fetcher" , currentUser)

            if (response) 
            {
                const data: any = await response.json();

                // console.log("Requester Data", data)

                    updateUserData({
                    documentType: data.DocType,
                    userDetected: data.Requester.EMail ,
                    userDetectedName: data.Requester.Title,
                    manager: data.Manager.EMail,
                    docId: data.Title,
                    company: data.Company,
                    costCenter: data.CostCenter,
                    FAMCode: data.FAMCode,
                    location: data.Location,
                    employeeNo: data.EmployeeNo,
                    famCode: data.FamCode0,
                    bussinessLine: data.BussinessLine,
                    region: data.Region,
                    approxValue: data.ApproxValue,
                    machineProjectNumber: data.MachineProjectNumber,
                    classification: data.Classification,
                    typeOfFOC: data.TypeOfFOC,
                    recordType: data.RecordType,
                    companyName: data.CompanyName,
                    division: data.Division,
                    CSINumber: data.CSINumber,
                    customerName: data.CustomerName,
                    tentativeDateOfSupply: new Date(data.TentativeDateOfSupply),
                    noOfHours: data.NoOfHours,
                    remarks: data.Remarks,
                    attachmentUrl: {Description: data.AttachedFileLinks.Description , Url: data.AttachedFileLinks.Url} ,
                    userId: currentUser.Id,
                    ItemId: data.Id ? data.Id : itemId,
                    currentUser: { email : currentUser.Email }
                })

            } 
            else 
            {
                console.error(`Error fetching data. Status: ${response}`);
                throw new Error(`Error fetching data. Status: ${response}`);
            }
        } 
        catch (error) 
        {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    React.useEffect(() => 
    {
        try 
        {
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams == null)
            {
                console.log("urlParams is empty", urlParams)
            }
            const itemId = urlParams.get('focDocumentId');
        
            if (itemId == null) 
            {
                console.log("Item Id is Null")
            }
            else
            {
                fetchData(itemId);
            }
        }
        catch(error) 
        {
            console.log(error)
        }
    }, [context]);

    return (
        <AppForContext.Provider value={{ context }}>
            {children}
        </AppForContext.Provider>
    );
};
