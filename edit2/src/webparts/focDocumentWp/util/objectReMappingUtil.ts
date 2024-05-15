import { UserData } from '../interfaces/IObjectUserData';
import sharepointFieldMapping from '../interfaces/ISPColumns';

export const objectReMapping = (userData: UserData): UserData => 
{

    const remappedUserData: any = {};

    for (const [oldField, newField] of Object.entries(sharepointFieldMapping)) 
    {
        const userDataKey = oldField as keyof UserData;
        const newUserDataKey = newField as keyof UserData;

        if (!(userDataKey in userData)) 
        {
            throw new Error(`Key "${userDataKey}" not found in UserData.`);
        }

        if (userData[userDataKey] !== undefined) 
        {
            remappedUserData[newUserDataKey] = userData[userDataKey];
        }
    }


    return remappedUserData;
};