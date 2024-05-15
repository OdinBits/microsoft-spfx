import * as React from "react";
import { UserData , initialUserData } from "../interface/IObjectUserData";
import DataContextProps from "../interface/IContextObjectState";
import { InitialAction } from "../interface/IActionData";
import { ApproverData, initialApproverData } from "../interface/IApproverData";


const DataContext = React.createContext<DataContextProps | undefined>(undefined);

type InitialActionType = typeof InitialAction;

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => 
{
    const [userData, setUserData] = React.useState<UserData>(initialUserData);

    const [ approverData , setApproverData ] = React.useState<ApproverData>(initialApproverData);

    const [actionData, setActionData] = React.useState<InitialActionType>(InitialAction);

    const updateUserData = (newData: Partial<UserData>): void => {
        setUserData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    const updateApproverData = (keyOrData: Partial<ApproverData>): void => {
        // console.log('Updating state with:', keyOrData);
        setApproverData((prevData) => ({
            ...prevData,
            ...keyOrData,
        }));
    };


    const updateActions = React.useCallback(
        (key: string, value: string, callback?: () => void): void => {
            setActionData((prevData: any) => ({
                ...prevData,
                [key]: value,
            }));
            if (callback) {
                callback();
            }
        },
        []
    );

    return (
        <DataContext.Provider value={{
                                        userData, 
                                        updateUserData, 
                                        approverData,
                                        updateApproverData,
                                        actionData,
                                        updateActions 
                                        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = (): DataContextProps => 
{
    const context = React.useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};
