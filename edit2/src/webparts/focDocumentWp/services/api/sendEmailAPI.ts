import '@pnp/sp/sputilities';
import { getSP } from '../../util/getSPUtil';

interface emailParam
{
    approver: string | undefined,
    context: any,
    itemId: number | undefined
}

export const sendEmail = 
async (config: emailParam) => 
{
    const { approver , context , itemId } = config;

    if (!approver) 
    {
        console.error('Manager email is undefined or null');
        return; // or handle the case where managerEmailId is undefined
    }

    const sp = getSP(context); // Pass the context to getSP

    try 
        {
        const itemLink = itemId
            ? `<a href="https://1zs3lg.sharepoint.com/sites/FOCandGoodwillINK/SitePages/foc-view.aspx?focDocumentId=${itemId}&mode=view"> Click Here </a>`
            : 'Item ID is undefined or empty';
    
        const emailProperties = 
        {
            To: [approver],
            Subject: 'Request pending for approval',
            Body: `Hello <b> ${approver} </b>. <br><br>
            Your request ${itemId ? 'with Item ID ' + itemId : ''} is pending for approval. <br><br>
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
        // Handle the response as needed
    } 
    catch (error) 
    {
        // Handle errors
        console.error(error);
    }
};