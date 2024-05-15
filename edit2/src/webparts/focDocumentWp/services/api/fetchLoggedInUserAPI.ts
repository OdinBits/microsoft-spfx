import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";
import { SPFI } from "@pnp/sp";


const fetchLoggedInUser = async (sp:SPFI) : Promise<ISiteUserInfo | undefined> =>
{
    try 
    {
        const currentUser = await sp.web.currentUser();
        return currentUser;
    }
    catch(error)
    {
        console.error('Error fetching current UserData', error);
    }

}

export default fetchLoggedInUser;