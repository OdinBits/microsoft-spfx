import OptionalApprover from '../../models/OptionalApproverConfig';
import SharePointResponse from '../../models/SharePointResponse';
import { getSP } from '../../util/getSPUtil';

const fetchSelectedOptionApproverAPI = async (param: OptionalApprover): Promise<SharePointResponse> => 
{
    const { context, option, listTitle, columnName } = param;

    try {
        const sp = getSP(context);

        if (!option) 
        {
            return { OptionalApprover: [] };
        }

        const encodedOption = encodeURIComponent(option);

        // Construct the API endpoint
        const filterQuery = `$filter=${columnName} eq '${encodedOption}'&$select=${columnName}/Name,${columnName}/EMail&$expand=${columnName}`;

        const response = await sp.web.lists.getByTitle(listTitle).items.select("OptionalApprover").filter(filterQuery)();

        if (response) {
            const data = response;

            console.log('data from the fetchSelectedOptionalApprover' , data)
            
            // if (data.length > 0) {
            //     const name = data[0].Name;
            //     const email = data[0].EMail;
            // }

            // return 
        } else {
            console.error(`Error fetching data: ${response}`);
        }

        return { OptionalApprover: [] };
    } catch (error) {
        console.error('Error fetching manager data:', error);
        return { OptionalApprover: [] };
    }
};

export default fetchSelectedOptionApproverAPI;
