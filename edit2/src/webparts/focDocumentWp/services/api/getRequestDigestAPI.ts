import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

const getRequestDigest = async (context: any): Promise<string> => 
{
    const digestEndpointUrl = `${context.pageContext.web.absoluteUrl}/_api/contextinfo`;

    try 
    {
        const response: SPHttpClientResponse = await context.spHttpClient.post(
            digestEndpointUrl,
            SPHttpClient.configurations.v1
        );

        if (response.ok) 
        {
            const data = await response.json();
            return data.FormDigestValue;
        } 
        else 
        {
            throw new Error(`Error obtaining request digest: ${response.statusText}`);
        }
    } 
    catch (error) 
    {
        throw new Error(`Error obtaining request digest: ${error}`);
    }
};

export default getRequestDigest;
