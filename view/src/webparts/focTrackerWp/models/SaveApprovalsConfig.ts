import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ActionData } from "../interface/IActionData";
import { UserData } from "../interface/IObjectUserData";
import { ApproverData } from "../interface/IApproverData";

interface ISaveApprovals
{
    context: WebPartContext;
    userData: UserData; 
    approverData: ApproverData ; 
    approverAction : ActionData;
    listName : string ;
}

export default ISaveApprovals;