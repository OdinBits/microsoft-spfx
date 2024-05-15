import * as React from 'react';
import { useDataContext } from './DataTrackingContext';
import { useDataFetcherContext } from './DataFetcher';
import getApproversActions from '../services/api/getApproversActions';
import getApproversEmailTitles from '../services/api/getApproversEmailTitles';

export const ApproverDataContext = React.createContext("Default");

export const ApproverProvider: React.FC = ({ children }) => 
{
    const { context } = useDataFetcherContext();
    const { userData, updateApproverData } = useDataContext();

    const fetchApproverData = async () => {
        try {
            const allApproversData = await getApproversActions({ userData, context });
            const allApproversEmailTitle = await getApproversEmailTitles({ userData, context });

                updateApproverData({

                    zonalManagerApproval: allApproversData.zonalManagerApproval,
                    zonalManagerComments: allApproversData.zonalManagerComments,
                    zonalManagerDate: allApproversData.zonalManagerDate,

                    bussinessLineManagerApproval: allApproversData.bussinessLineManagerApproval,
                    bussinessLineManagerComments: allApproversData.bussinessLineManagerComments,
                    bussinessLineManagerDate: allApproversData.bussinessLineManagerDate,

                    generalManagerApproval: allApproversData.generalManagerApproval,
                    generalManagerComments: allApproversData.generalManagerComments,
                    generalManagerDate: allApproversData.generalManagerDate,

                    seniorTeamLeaderApproval: allApproversData.seniorTeamLeaderApproval,
                    seniorTeamLeaderComments: allApproversData.seniorTeamLeaderComments,
                    seniorTeamLeaderDate: allApproversData.seniorTeamLeaderDate,

                    projectManagerApproval: allApproversData.projectManagerApproval,
                    projectManagerComments: allApproversData.projectManagerComments,
                    projectManagerDate: allApproversData.projectManagerDate,

                    CSOApproval: allApproversData.CSOApproval,
                    CSOComments: allApproversData.CSOComments,
                    CSODate: allApproversData.CSODate,

                    zonalMail: allApproversEmailTitle.zonalManager,
                    bussinessMail: allApproversEmailTitle.bussinessManager,
                    generalMail: allApproversEmailTitle.generalManager,
                    seniorMail: allApproversEmailTitle.seniorTeamLeader,
                    projectMail: allApproversEmailTitle.projectManager,
                    CSOMail: allApproversEmailTitle.CSOManager,

                    zonalTitle: allApproversEmailTitle.zonalManagerName,
                    bussinessTitle: allApproversEmailTitle.bussinessManagerName,
                    generalTitle: allApproversEmailTitle.generalManagerName,
                    seniorTitle: allApproversEmailTitle.seniorTeamLeaderName,
                    projectTitle: allApproversEmailTitle.projectManagerName,
                    CSOTitle: allApproversEmailTitle.CSOManagerName,

                });

            } catch (error) {
                console.error('Error fetching approver data:', error.message || error);
                throw error;
            }
        };
    
        React.useEffect(() => 
        {
            try 
            {
                fetchApproverData();
            } 
            catch (error) 
            {
                console.error('Error in useEffect:', error.message || error);
            }
        }, [context ,userData.documentType , userData.ItemId ]);
    
        return (
            <ApproverDataContext.Provider value="Default">
                {children}
            </ApproverDataContext.Provider>
        );
    };
