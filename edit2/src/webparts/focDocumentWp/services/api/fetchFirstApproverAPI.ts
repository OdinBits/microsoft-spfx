import { getSP } from "../../util/getSPUtil";
interface Approver 
{
    approver: string | undefined;
    approverId : number;
}

const initialFamRequisite : Approver = 
{
    approver: undefined,
    approverId: 0
}

// parameters are wrong correct it here 
const fetchFirstApprover = async (param:{ DocType:string, context : any}): Promise<Approver> => 
{
    const { context ,DocType } = param;

    const sp = getSP(context);

    try 
    {
        const filterQuery = `DocType eq '${DocType}'`;

        const response = await sp.web.lists.getByTitle("ApproverSet-DocType").items.filter(filterQuery)
            .select("Approvers/EMail,Approvers/Id").expand("Approvers")();

        const firstApprover = response[0].Approvers ? response[0].Approvers.EMail : null;
        const firstApproverId = response[0].Approvers ? response[0].Approvers.Id : null;

        if (response && response.length > 0) 
        {
            const Approver =
            {
                approver : firstApprover,
                approverId : firstApproverId
            };

            return Approver;
        }
        else 
        {
            alert('No User found ... from fetchEmployee.ts')
            return initialFamRequisite;
        }
    }
    catch (error) 
    {
        console.error('Error fetching employee data:', error);
        throw error;
    }
};

export default fetchFirstApprover;
