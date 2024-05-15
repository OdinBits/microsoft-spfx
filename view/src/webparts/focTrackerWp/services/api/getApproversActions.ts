import { UserData } from '../../interface/IObjectUserData';
import { getSP } from '../../utils/getSPUtil';

interface ApproversActions {
    zonalManagerApproval: string | null;
    zonalManagerComments: string | null;
    zonalManagerDate: Date | null;
    bussinessLineManagerApproval: string | null;
    bussinessLineManagerComments: string | null;
    bussinessLineManagerDate: Date | null;
    generalManagerApproval: string | null;
    generalManagerComments: string | null;
    generalManagerDate: Date | null;
    seniorTeamLeaderApproval: string | null;
    seniorTeamLeaderComments: string | null;
    seniorTeamLeaderDate: Date | null;
    projectManagerApproval: string | null;
    projectManagerComments: string | null;
    projectManagerDate: Date | null;
    CSOApproval: string | null;
    CSOComments: string | null;
    CSODate: Date | null;
}

interface Params {
    userData: UserData;
    context: any;
}

const getApproversActions = async ({ userData, context }: Params): Promise<ApproversActions> => 
{
    const sp = getSP(context);

    const itemId = userData.ItemId;

    let data: any;

    if (userData.documentType === "FOC Document" || userData.documentType === "GOODWILLDoc") 
    {
        const FOCFilterQuery = `ReferenceId eq ${itemId}`;
        const response = await sp.web.lists.getByTitle('ApproversSet-GOODWILLDoc').items.filter(FOCFilterQuery).select('Id')();
        const IdofReferenceId = response.length > 0 ? response[0].Id : null;

        if (IdofReferenceId) 
        {
            data = await sp.web.lists.getByTitle('ApproversSet-GOODWILLDoc').items.getById(IdofReferenceId)();
            console.log("data offfff", data);
        } 
        else 
        {
            console.error('No matching item found for the given filter criteria.');
        }
    } 
    else if (userData.documentType === "FOC Project") 
    {
        const FOCProjectQuery = `ReferenceId eq ${itemId}`;
        const response = await sp.web.lists.getByTitle('ApproversSet-FocProject').items.filter(FOCProjectQuery).select('Id')();
        const IdofReferenceId = response.length > 0 ? response[0].Id : null;

        if (IdofReferenceId) 
        {
            data = await sp.web.lists.getByTitle('ApproversSet-FocProject').items.getById(IdofReferenceId)();
            // console.log("data offfff project", data);
        } 
        else 
        {
            console.error('No matching item found for the given filter criteria.');
        }
        console.log("data offfff Project", data)
    }

    const AllApproversActions: ApproversActions = {
        zonalManagerApproval: data?.ZonalManagerApproval ?? null,
        zonalManagerComments: data?.ZonalManagerComments ?? null,
        zonalManagerDate: data?.ZonalManagerDate ? new Date(data.ZonalManagerDate) : null,

        bussinessLineManagerApproval: data?.BussinessLineManagerApproval ?? null,
        bussinessLineManagerComments: data?.BussinessLineManagerComments ?? null,
        bussinessLineManagerDate: data?.BussinessLineManagerDate ? new Date(data.BussinessLineManagerDate) : null,

        generalManagerApproval: data?.GeneralManagerApproval ?? null,
        generalManagerComments: data?.GeneralManagerComments ?? null,
        generalManagerDate: data?.GeneralManagerDate ? new Date(data.GeneralManagerDate) : null,

        seniorTeamLeaderApproval: data?.SeniorTeamLeaderApproval ?? null,
        seniorTeamLeaderComments: data?.SeniorTeamLeaderComments ?? null,
        seniorTeamLeaderDate: data?.SeniorTeamLeaderDate ? new Date(data.SeniorTeamLeaderDate) : null,

        projectManagerApproval: data?.ProjectManagerApproval ?? null,
        projectManagerComments: data?.ProjectManagerComments ?? null,
        projectManagerDate: data?.ProjectManagerDate ? new Date(data.ProjectManagerDate) : null,

        CSOApproval: data?.CSOApproval ?? null,
        CSOComments: data?.CSOComments ?? null,
        CSODate: data?.CSODate ? new Date(data.CSODate) : null,
    };

    return AllApproversActions;
}

export default getApproversActions;