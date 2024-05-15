import { WebPartContext } from '@microsoft/sp-webpart-base';

interface CurrentUserData {
    userName: string;
    uniqueId: string;
    userEmail: string;
    userLoginName: string;
}

const fetchCurrentUserDetails = async (context: WebPartContext): Promise<CurrentUserData> => 
{
    try 
    {
        const currentUser = context.pageContext.user;

        // console.log('current User ', currentUser)

        if (!currentUser || !currentUser.displayName || !currentUser.email || !currentUser.loginName) 
        {
            console.warn('User information is missing or incomplete.');
            // Consider throwing an error or handling this case differently
        }

        const userEmail: string = currentUser.email;
        const userName: string = currentUser.displayName || '';
        const userLoginName: string = currentUser.loginName || '';
        const userIdPrefix = userName ? userName.substring(0, 4) : '';
        const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();
        const generatedUniqueId = userIdPrefix + randomSuffix;

        return { userEmail, userName, userLoginName, uniqueId: generatedUniqueId };
    } 
    catch (error) 
    {
        console.error('Error fetching current user data:', error);
        // Consider handling the error or rethrowing it based on your requirements
        throw error;
    }
};

export default fetchCurrentUserDetails;
