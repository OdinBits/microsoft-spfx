interface ApproverData
{

    zonalManagerApproval: string | null;
    zonalManagerComments : string | null;
    zonalManagerDate: Date | null;

    bussinessLineManagerApproval: string | null;
    bussinessLineManagerComments : string | null;
    bussinessLineManagerDate: Date | null;

    generalManagerApproval: string | null
    generalManagerComments : string | null;
    generalManagerDate: Date | null;

    seniorTeamLeaderApproval : string |null;
    seniorTeamLeaderComments : string | null;
    seniorTeamLeaderDate : Date | null;

    projectManagerApproval : string |null;
    projectManagerComments : string | null;
    projectManagerDate : Date | null;

    CSOApproval: string | null;
    CSOComments : string | null;
    CSODate: Date | null;
    
    zonalMail : string | undefined;
    bussinessMail : string | undefined;
    generalMail : string | undefined;
    seniorMail : string | undefined;
    projectMail : string | undefined;
    CSOMail : string | undefined;

    zonalTitle : string | undefined;
    bussinessTitle : string | undefined;
    generalTitle : string | undefined;
    seniorTitle : string | undefined;
    projectTitle: string | undefined
    CSOTitle :string | undefined;
}

const initialApproverData : ApproverData =
{
    generalManagerApproval: null,
    generalManagerComments: null,
    generalManagerDate: null,

    zonalManagerApproval: null,
    zonalManagerComments: null,
    zonalManagerDate: null,

    bussinessLineManagerApproval: null,
    bussinessLineManagerComments: null,
    bussinessLineManagerDate: null,

    seniorTeamLeaderApproval: null,
    seniorTeamLeaderComments: null,
    seniorTeamLeaderDate: null,

    CSOApproval: null,
    CSOComments: null,
    CSODate: null,
    zonalMail: undefined,
    bussinessMail: undefined,
    generalMail: undefined,
    seniorMail: undefined,
    CSOMail: undefined,

    zonalTitle: undefined,
    bussinessTitle: undefined,
    generalTitle: undefined,
    seniorTitle: undefined,
    CSOTitle: undefined,

    projectManagerApproval: null,
    projectManagerComments: null,
    projectManagerDate: null,
    projectMail: undefined,
    projectTitle: undefined
}



export { ApproverData, initialApproverData };