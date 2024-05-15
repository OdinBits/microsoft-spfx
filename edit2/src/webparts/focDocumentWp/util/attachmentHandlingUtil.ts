import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

export const uploadAttachments = async (
    spHttpClient: SPHttpClient,
    libraryName: string,
    attachments: { file: File | undefined, filename: string },
    digest: string
): Promise<string | undefined> => {
    try {
        const attachmentEndpointUrl = `${"https://1zs3lg.sharepoint.com/sites/FOCandGoodwillINK"}/_api/web/lists/getbytitle('${libraryName}')/RootFolder/Files/add(url='${attachments.filename}',overwrite=true)`;

        const attachmentOptions: ISPHttpClientOptions =
        {
            body: attachments.file,
            headers: {
                'X-RequestDigest': digest,
                'Content-Type': 'application/octet-stream',
            },
        };

        // console.log('Digest:', digest);

        const attachmentResponse: SPHttpClientResponse = await spHttpClient.post(
            attachmentEndpointUrl,
            SPHttpClient.configurations.v1,
            attachmentOptions
        );

        // console.log('Attachment Response:', attachmentResponse);

        if (attachmentResponse.ok) {
            console.log('File uploaded successfully');

            const attachmentUrl = `${"https://1zs3lg.sharepoint.com/sites/FOCandGoodwillINK"}/${libraryName}/${attachments.filename}`;

            return attachmentUrl;
        } else {
            console.error('Error uploading file:', attachmentResponse.statusText);
            return undefined;
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        return undefined;
    }
};
