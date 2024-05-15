import { ActionData } from "./IActionData";
import { ApproverData } from "./IApproverData";
import { UserData } from "./IObjectUserData";


interface DataContextProps 
{
    userData: UserData;
    updateUserData: (newData: Partial<UserData>) => void;

    approverData  : ApproverData;
    updateApproverData : (newData: Partial<ApproverData>) => void;

    actionData: ActionData;
    updateActions: (key: string, value: string) => void;

}

export default DataContextProps;