import { UserData } from "../../interface/IObjectUserData";
import { getSP } from "../../utils/getSPUtil";

interface ApproversData 
{
    zonalManager: string;
    zonalManagerName: string;
    bussinessManager: string;
    bussinessManagerName: string;
    generalManager: string;
    generalManagerName: string;
    seniorTeamLeader: string;
    seniorTeamLeaderName: string;
    projectManager: string;
    projectManagerName: string;
    CSOManager: string;
    CSOManagerName: string;
}

interface Params {
    context: any;
    userData: UserData;
}

const getApproversEmailTitles = async ({ context, userData }: Params): Promise<ApproversData> => {
    const sp = getSP(context);

    const DocType = userData.documentType;
    const filterQuery = `DocType eq '${DocType}'`;

    const response = await sp.web.lists.getByTitle("ApproverSet-DocType").items.filter(filterQuery)
        .select("Approvers/EMail,Approvers/Title,BussinessLineManager/EMail,BussinessLineManager/Title,GeneralManager/EMail,GeneralManager/Title,SeniorTeamLeader/EMail,SeniorTeamLeader/Title,CSOManager/EMail,CSOManager/Title,ProjectManager/EMail,ProjectManager/Title")
        .expand("Approvers,BussinessLineManager,GeneralManager,SeniorTeamLeader,CSOManager,ProjectManager")();

    // console.log('response in getApproversEmailTitles', response);

    return {
        zonalManager: response[0]?.Approvers?.EMail ?? null,
        zonalManagerName: response[0]?.Approvers?.Title ?? null,
        bussinessManager: response[0]?.BussinessLineManager?.EMail ?? null,
        bussinessManagerName: response[0]?.BussinessLineManager?.Title ?? null,
        generalManager: response[0]?.GeneralManager?.EMail ?? null,
        generalManagerName: response[0]?.GeneralManager?.Title ?? null,
        seniorTeamLeader: response[0]?.SeniorTeamLeader?.EMail ?? null,
        seniorTeamLeaderName: response[0]?.SeniorTeamLeader?.Title ?? null,
        projectManager: response[0]?.ProjectManager?.EMail ?? null,
        projectManagerName: response[0]?.ProjectManager?.Title ?? null,
        CSOManager: response[0]?.CSOManager?.EMail ?? null,
        CSOManagerName: response[0]?.CSOManager?.Title ?? null,
    };
};

export default getApproversEmailTitles;