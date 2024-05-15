import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { UserData } from '../../interfaces/IObjectUserData';
import { objectReMapping } from '../../util/objectReMappingUtil';
import { uploadAttachments } from '../../util/attachmentHandlingUtil';
import getRequestDigest from './getRequestDigestAPI';
import { sendEmail } from './sendEmailAPI';
import fetchFirstApprover from './fetchFirstApproverAPI';
import saveApprover from './saveFirsApproverAPI';

interface saveParam
{
  context : any;
  userData: UserData;
}

export const saveData = 
async (config: saveParam): Promise<{ success: boolean; message?: string }> => 
{
  const { context , userData } = config;

  const listName = 'View All Request';
  const documentListName = 'Attachment Records';

  try 
      {
        const endpointUrl = `${"https://1zs3lg.sharepoint.com/sites/FOCandGoodwillINK"}/_api/web/lists/getbytitle('${listName}')/items`;
        const spHttpClient: SPHttpClient = context.spHttpClient;
        const digest: string = await getRequestDigest(context);        

        let FileUrl: string | undefined = '';        
        if (userData.attachmentFile) 
        {
          FileUrl = await uploadAttachments(
                                              spHttpClient,
                                              documentListName,
                                              {
                                                file: userData.attachmentFile.file,
                                                filename: userData.attachmentFile.fileName,
                                              },
                                              digest
                                            );
        } 
        else 
            {
              console.log('No Attachment file present');
            }
            
        if (!userData.attachmentUrl) 
        {
          userData.attachmentUrl = { Url: '' };
        }
        
        if (FileUrl) 
        {
          userData.attachmentUrl.Url = FileUrl;
        } 
        else 
        {
          console.log('No Attachment provided or FileUrl is undefined');
        }
        if (!userData.attachmentUrl) 
        {
          userData.attachmentUrl = { Url: '' };
        }

        // Remove the attachmentFile property from userData
        delete (userData as { attachmentFile?: File; }).attachmentFile;

        // Map the user data
        const mappedUserData = objectReMapping(userData);

        // Configure the HTTP request options
        const spHttpClientOptions: ISPHttpClientOptions = { body: JSON.stringify(mappedUserData) };

        // Perform the HTTP post request to save data
        const response: SPHttpClientResponse = 
        await spHttpClient.post(
                                  endpointUrl,
                                  SPHttpClient.configurations.v1,
                                  spHttpClientOptions
                                );
        // Check the response status and log accordingly
        if (response.ok) 
        {
          const responseJson = await response.json();
          // Check if 'Id' property is present in the response
          if (responseJson.Id) 
          {
            const itemId = responseJson.Id;
          // console.log('UserData and Attachments saved to SharePoint successfully with Item ID:', itemId);

            if(userData.documentType == "FOC Document")
            {
              const Approver = await fetchFirstApprover({DocType:"FOC Document",context:context})
              const FirstApprover = Approver.approver;
              const ApproverId = Approver.approverId;
              
              await saveApprover({referenceId:itemId,approverId:ApproverId,context:context,listName:"ApproversSet-GOODWILLDoc",userData:userData})
              await sendEmail( {approver:FirstApprover, context:context, itemId:itemId});
            }
            else if(userData.documentType == "FOC Project")
            {
              const Approver = await fetchFirstApprover({DocType:"FOC Project",context:context})
              const FirstApprover = Approver.approver;
              const ApproverId = Approver.approverId;
              
              await saveApprover({referenceId:itemId,approverId:ApproverId,context:context,listName:"ApproversSet-FocProject",userData:userData})
              await sendEmail( {approver:FirstApprover, context:context, itemId:itemId});
            }
            else if(userData.documentType == "GOODWILLDoc")
            {
              const Approver = await fetchFirstApprover({DocType:"GOODWILLDoc",context:context})
              const FirstApprover = Approver.approver;
              const ApproverId = Approver.approverId;
              
              await saveApprover({referenceId:itemId,approverId:ApproverId,context:context,listName:"ApproversSet-GOODWILLDoc",userData:userData})
              await sendEmail( {approver:FirstApprover, context:context, itemId:itemId});
            }
            else
            {
              window.alert("somethng went wrong")
            }

            return { success: true, message: 'UserData and Attachments saved to SharePoint successfully' };
          } 
          else 
          {
            console.error('Error: "Id" property not found in the response JSON.');
            return { success: false, message: '"Id" property not found in the response JSON.' };
          }
        }                                                                                                       
        else 
        {
          console.error('Error saving UserData to SharePoint:', response.statusText);
          return { success: false, message: `Error saving UserData to SharePoint: ${response.statusText}` };
        }
      } 
    catch (error) 
    {
      console.error('Error saving UserData to SharePoint:', error);
      return { success: false, message: `Error saving UserData to SharePoint: ${error}` };
    }
};
