import SaveApprovals from '../services/api/saveApprovalsDecisionApi';
import { sendEmail } from '../services/api/sendEmailApi';
import SaveAndEmailParams from '../models/SendEmailsConfig';
// import endSaveApproval from '../services/api/endApprovalSaveApi';
// import { sendEndEmail } from '../services/api/endEmailAPi';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ActionData } from '../interface/IActionData';
import { ApproverData } from '../interface/IApproverData';
import { UserData } from '../interface/IObjectUserData';

interface decisionFlowProp {
    context: WebPartContext;
    userData: UserData;
    approverData: ApproverData;
    approverAction: ActionData;
}

export const decisionTree = async (config: decisionFlowProp): Promise<{ success: boolean; message?: string }> => 
{
    const { context, userData, approverData, approverAction } = config;

    const cost = parseInt(userData.approxValue || '0', 10);

    const {
        zonalManagerApproval,
        bussinessLineManagerApproval,
        generalManagerApproval,
        seniorTeamLeaderApproval,
        projectManagerApproval,
        CSOApproval,
        zonalMail,
        bussinessMail,
        generalMail,
        seniorMail,
        projectMail,
        CSOMail } = config.approverData;

    const { currentUser } = config.userData;

    try {
        const saveAndSendEmail = async (config: SaveAndEmailParams): Promise<void> => {
            // console.log(`in the ${config}`);
            // console.log('approverFlow', approverData);

            const { nextApproverEmail, currentApprover, listName } = config;

            await SaveApprovals({ context, userData, approverData, approverAction, listName });
            await sendEmail({
                approverEmail: nextApproverEmail,
                context: context,
                userData: userData,
                currentApprover: currentApprover,
            });
        }

        // separating concern as being approver or not
        const approver = (currentUser?.email ?? '').toLowerCase();

        // console.log("I am Approver" , approver)

        // console.log("I am in the ZonalApprover",zonalManagerApproval)

        switch (true) {
            case (
                (approver === (zonalMail ?? '').toLowerCase() && zonalManagerApproval === null) ||
                (approver === (bussinessMail ?? '').toLowerCase() && bussinessLineManagerApproval === null) ||
                (approver === (generalMail ?? '').toLowerCase() && generalManagerApproval === null) ||
                (approver === (seniorMail ?? '').toLowerCase() && seniorTeamLeaderApproval === null) ||
                (approver === (projectMail ?? '').toLowerCase() && projectManagerApproval === null) ||
                (approver === (CSOMail ?? '').toLowerCase() && CSOApproval === null)
            ):

                switch (true) 
                {
                    // separating our concerns first 
                    case (seniorTeamLeaderApproval === null &&
                        cost <= 30000 && CSOApproval === null &&
                        userData.documentType === "FOC Project"
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: CSOMail,
                            currentApprover: "CSO",
                            listName: "ApproversSet-FocProject"
                        });
                        break;

                    case (seniorTeamLeaderApproval === 'Approved' &&
                        cost <= 30000 && CSOApproval === null &&
                        userData.documentType === "FOC Project"
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: userData.currentUser?.email ? userData.currentUser?.email : currentUser?.email,
                            currentApprover: "Requester",
                            listName: "ApproversSet-FocProject"
                        });
                        alert("Approval Flow completed .... sending Mail to Requester")
                        break;

                    case (
                        seniorTeamLeaderApproval === null &&
                        CSOApproval === null && userData.documentType === "FOC Project"
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: projectMail,
                            currentApprover: "Project Manager",
                            listName: "ApproversSet-FocProject"
                        });
                        break;

                    case (
                        seniorTeamLeaderApproval === 'Approved' &&
                        projectManagerApproval === null &&
                        CSOApproval === null && userData.documentType === "FOC Project"
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: bussinessMail,
                            currentApprover: "Bussiness Line",
                            listName: "ApproversSet-FocProject"
                        });
                        break;

                    case (
                        seniorTeamLeaderApproval === 'Approved' &&
                        projectManagerApproval === 'Approved' &&
                        bussinessLineManagerApproval === null &&
                        CSOApproval === null && userData.documentType === "FOC Project"
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: generalMail,
                            currentApprover: "General Manager",
                            listName: "ApproversSet-FocProject"
                        });
                        break;

                    case (
                        seniorTeamLeaderApproval === 'Approved' &&
                        projectManagerApproval === 'Approved' &&
                        bussinessLineManagerApproval === 'Approved' &&
                        generalManagerApproval === null &&
                        CSOApproval === null && userData.documentType === "FOC Project"
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: CSOMail,
                            currentApprover: "CSO",
                            listName: "ApproversSet-FocProject"
                        });
                        break;

                    case (
                        seniorTeamLeaderApproval === 'Approved' &&
                        projectManagerApproval === 'Approved' &&
                        bussinessLineManagerApproval === 'Approved' &&
                        generalManagerApproval === 'Approved' &&
                        CSOApproval === null && userData.documentType === "FOC Project"
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: userData.currentUser?.email,
                            currentApprover: "Requester",
                            listName: "ApproversSet-FocProject"
                        });
                        alert("Project Approval Completed... sending Mail to Requester")
                        break;

                    // First Approver Set

                    case (zonalManagerApproval === null && cost < 50000 && CSOApproval === null):
                        await saveAndSendEmail({
                            nextApproverEmail: CSOMail,
                            currentApprover: "CSO",
                            listName: "ApproversSet-GOODWILLDoc"
                        });
                        break;

                    case (zonalManagerApproval === 'Approved' && cost < 50000 && CSOApproval === null):
                        await saveAndSendEmail({
                            nextApproverEmail: userData.currentUser?.email ? userData.currentUser?.email : currentUser?.email,
                            currentApprover: "Requester",
                            listName: "ApproversSet-GOODWILLDoc"
                        });
                        break;

                    case (
                        zonalManagerApproval === null &&
                        CSOApproval === null
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: bussinessMail,
                            currentApprover: "Bussiness Line",
                            listName: "ApproversSet-GOODWILLDoc"
                        });
                        break;

                    case (
                        zonalManagerApproval === 'Approved' &&
                        bussinessLineManagerApproval === null &&
                        CSOApproval === null
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: generalMail,
                            currentApprover: "General Manager",
                            listName: "ApproversSet-GOODWILLDoc"
                        });
                        break;

                    case (
                        zonalManagerApproval === 'Approved' &&
                        bussinessLineManagerApproval === 'Approved' &&
                        generalManagerApproval === null &&
                        CSOApproval === null
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: CSOMail,
                            currentApprover: "CSO",
                            listName: "ApproversSet-GOODWILLDoc"
                        });
                        break;

                    case (
                        zonalManagerApproval === 'Approved' &&
                        bussinessLineManagerApproval === 'Approved' &&
                        generalManagerApproval === 'Approved' &&
                        CSOApproval === null
                    ):
                        await saveAndSendEmail({
                            nextApproverEmail: userData.currentUser?.email ? userData.currentUser?.email : currentUser?.email,
                            currentApprover: "Requester",
                            listName: "ApproversSet-GOODWILLDoc"
                        });
                        alert("Project Approval Completed... sending Mail to Requester")
                        break;


                    case (CSOApproval === 'Approved'):
                        alert("Already Approved by CSO , ...Please Contact Your Team")
                        break;

                    default:
                        console.error('Invalid or unhandled case. |  Or Your Request is Rejected Conditions:', {});
                        return { success: false, message: "Approver Data Not Saved" };
                }
                break;

            default:
                console.error('Not an Approver, Your Request is Rejected Conditions:', {});
                return { success: false, message: "Approver Data Not Saved" };
        }

        return { success: true, message: "Approver Data Saved Successfully" };
    }
    catch (error) {
        console.error('Error in approverFlowDecision:', error);
        return { success: false, message: `Error in approverFlowDecision: ${error.message || error}` };
    }
};
