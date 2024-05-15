import { UserData } from "../../interfaces/IObjectUserData";
import { getSP } from "../../util/getSPUtil";

interface SaveApproverConfig {
    referenceId: number;
    approverId: number;
    context: any;
    listName: string;
    userData: UserData;
}

const saveApprover = async (config: SaveApproverConfig) => 
{
    const { referenceId, approverId, context, listName, userData } = config;

    const sp = getSP(context);

    let approverData: any = {}; 

    try {
        if (userData.documentType === "FOC Document" || userData.documentType === "GOODWILLDoc") 
        {
            approverData = 
            {
                ReferenceId: referenceId,
                ZonalManagerId: approverId
            };
        } 
        else if (userData.documentType === "FOC Project") 
        {
            approverData = {
                ReferenceId: referenceId,
                SeniorTeamLeaderId: approverId
            };
        }

        await sp.web.lists.getByTitle(listName).items.add(approverData);
    } 
    catch (error) 
    {
        console.error('Error saving approver data:', error);
        throw error;
    }
};

export default saveApprover;
