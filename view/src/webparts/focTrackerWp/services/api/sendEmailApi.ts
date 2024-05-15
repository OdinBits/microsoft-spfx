import '@pnp/sp/sputilities';
import { getSP } from '../../utils/getSPUtil';
import emailState from '../../models/EmailStateConfig';

export const sendEmail = async (config : emailState): Promise<void> => 
{
    const {approverEmail , context , userData , currentApprover } = config;
    

    if (!approverEmail) 
    {
        console.error('Manager email is undefined or null');
        return; 
        
    }

    const sp = getSP(context); 

    try 
    {
        const itemLink = userData.ItemId
            ? `<a href="https://1zs3lg.sharepoint.com/sites/FOCandGoodwillINK/SitePages/foc-view.aspx?focDocumentId=${userData.ItemId}&mode=view"> Click Here </a>`
            : 'Item ID is undefined or empty';

        const emailProperties =
        {
            To: [approverEmail],
            Subject: 'Request pending for approval',
            Body: `Hello <b> ${currentApprover} </b>. <br><br>
                Your request ${userData.ItemId ? 'with Item ID ' + userData.ItemId : ''} is pending for approval. <br><br>
                ${itemLink} to navigate to the Application. <br><br>
                Kind regards, <br>
                FOC and Goodwil INK
                `,

            AdditionalHeaders:
            {
                "content-type": "text/html"
            }
        };
        await sp.utility.sendEmail(emailProperties);
        // const response =
        // console.log(response);
        
    } 
    catch (error) 
    {
        
        console.error(error);
    }
};