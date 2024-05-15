import { WebPartContext } from "@microsoft/sp-webpart-base";
import { UserData } from "../interface/IObjectUserData";

interface emailState {
    approverEmail: string | undefined,
    context: WebPartContext,
    userData: UserData,
    currentApprover: string  | undefined
}

export default emailState;