import { getSP } from '../../utils/getSPUtil';
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import ISaveApprovals from '../../models/SaveApprovalsConfig';

const SaveApprovals = async (params: ISaveApprovals): Promise<void> => {
    const { context, userData, approverData, listName } = params;
    const { comments, actions } = params.approverAction;

    if (!actions) {
        console.warn('No actions to save. Waiting for actions to be provided.');

        await new Promise<void>((resolve) => {
            const checkActions = () => {
                if (params.approverAction.actions) {
                    resolve();
                }
                else {
                    setTimeout(checkActions, 100);
                }
            };
            checkActions();
        });

    }

    try {
        const sp = getSP(context);

        if (!sp.web || !userData || !approverData) {
            console.error('SharePoint context, user data, or approver data not available.');
            return;
        }

        const itemId = userData.ItemId;
        const cost = parseInt(userData.approxValue || '0', 10);


        if (isNaN(itemId)) {
            console.error('Item id is missing or not a valid number.');
            return;
        }

        const finalActions = { comments: comments, action: actions };
        // console.log('finalActions', finalActions);
        let itemToAdd: Record<string, any> = {};

        const currentUser = (userData.currentUser?.email ?? '').toLowerCase();

        if (
            currentUser === (approverData.seniorMail ?? '').toLowerCase() &&
            approverData.seniorTeamLeaderComments === null &&
            approverData.seniorTeamLeaderApproval === null && userData.documentType === "FOC Project"
        ) {
            itemToAdd = {
                SeniorTeamLeaderId: userData.userId,
                SeniorTeamLeaderComments: finalActions.comments,
                SeniorTeamLeaderApproval: finalActions.action,
                SeniorTeamLeaderDate: new Date()
            };
        }

        else if (
            currentUser === (approverData.CSOMail ?? '').toLowerCase() &&
            approverData.seniorTeamLeaderApproval === 'Approved' &&
            userData.documentType === "FOC Project" &&
            approverData.CSOComments === null &&
            approverData.CSOApproval === null &&
            cost < 30000
        ) {
            itemToAdd =
            {
                CSOId: userData.userId,
                CSOComments: finalActions.comments,
                CSOApproval: finalActions.action,
                CSODate: new Date(),
                ProjectManagerApproval: 'Not-Needed',
                BussinessLineManagerApproval: 'Not-Needed',
                GeneralManagerApproval: 'Not-Needed'
            };
        }

        else if (
            currentUser === (approverData.projectMail ?? '').toLowerCase() &&
            approverData.projectManagerComments === null &&
            approverData.projectManagerApproval === null && userData.documentType === "FOC Project"
        ) {
            itemToAdd =
            {
                ProjectManagerId: userData.userId,
                ProjectManagerComments: finalActions.comments,
                ProjectManagerApproval: finalActions.action,
                ProjectManagerDate: new Date()
            };
        }

        else if (
            currentUser === (approverData.CSOMail ?? '').toLowerCase() &&
            approverData.zonalManagerApproval === 'Approved' &&
            approverData.CSOComments === null &&
            approverData.CSOApproval === null &&
            cost < 50000
        ) {
            itemToAdd =
            {
                CSOId: userData.userId,
                CSOComments: finalActions.comments,
                CSOApproval: finalActions.action,
                CSODate: new Date(),
                BussinessLineManagerApproval: 'Not-Needed',
                GeneralManagerApproval: 'Not-Needed'
            };
        }


        else if (
            currentUser === (approverData.zonalMail ?? '').toLowerCase() &&
            approverData.zonalManagerComments === null &&
            approverData.zonalManagerApproval === null &&
            (userData.documentType === "FOC Document" || userData.documentType === "GOODWILLDoc")
        ) 
        {
            itemToAdd = {
                ZonalManagerApproval: finalActions.action,
                ZonalManagerDate: new Date(),
                ZonalManagerComments: finalActions.comments,
            };
        }


        else if (
            currentUser === (approverData.bussinessMail ?? '').toLowerCase() &&
            approverData.bussinessLineManagerComments === null &&
            approverData.bussinessLineManagerApproval === null
        ) {
            itemToAdd =
            {
                BussinessLineManagerId: userData.userId,
                BussinessLineManagerApproval: finalActions.action,
                BussinessLineManagerDate: new Date(),
                BussinessLineManagerComments: finalActions.comments
            };
        }

        else if (
            currentUser === (approverData.generalMail ?? '').toLowerCase() &&
            approverData.generalManagerComments === null &&
            approverData.generalManagerApproval === null
        ) {
            itemToAdd =
            {
                GeneralManagerId: userData.userId,
                GeneralManagerComments: finalActions.comments,
                GeneralManagerApproval: finalActions.action,
                GeneralManagerDate: new Date()
            };
        }

        else if (
            currentUser === (approverData.CSOMail ?? '').toLowerCase() &&
            approverData.CSOComments === null &&
            approverData.CSOApproval === null
        ) {
            itemToAdd =
            {
                CSOId: userData.userId,
                CSOComments: finalActions.comments,
                CSOApproval: finalActions.action,
                CSODate: new Date()
            };
        }
        else {
            console.log('No data found in approver Fields');
        }

        if (Object.values(itemToAdd).some((value) => value === undefined)) {
            console.error('Invalid data in itemToAdd. Some required properties are missing or have invalid values.');
            return;
        }

        // console.log("ItemToAdd in saveApprovals",itemToAdd);

        const filter = `ReferenceId eq ${itemId}`;

        const response = await sp.web.lists.getByTitle(listName).items.filter(filter).select('ID')();

        // console.log("i am in saveApproval",response)

        const IdofReferenceId = response.length > 0 ? response[0].Id : null;

        if (IdofReferenceId) {
            const addedItem = await sp.web.lists.getByTitle(listName).items.getById(IdofReferenceId).update(itemToAdd);

            console.log('Item addted successfully:', addedItem);
        }
        else {
            console.error('No matching item found for the given filter criteria.');
            console.log("IdtoRefer", IdofReferenceId)
        }

    }
    catch (error) {
        console.error('Error saving approvals:', error);
    }
};

export default SaveApprovals;
