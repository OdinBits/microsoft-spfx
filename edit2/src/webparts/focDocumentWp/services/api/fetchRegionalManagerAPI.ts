import { getSP } from "../../util/getSPUtil";
interface regionalManager 
{
    regionalManager: string | undefined;
}

const initialFamRequisite : regionalManager = 
{
    regionalManager: undefined
}

// parameters are wrong correct it here 
const fetchRegionalManager = async (param:{value: string, context : any}): Promise<regionalManager> => 
{
    const { value , context } = param;

    const sp = getSP(context);

    try 
    {
        const filterQuery = `RegionalManager eq '${value}'`;

        const response = await sp.web.lists.getByTitle('Region').items.filter(filterQuery)
            .select("OptionalApprover/Title").expand("OptionalApprover")();

        const RegionalManager = response[0].OptionalApprover ? response[0].OptionalApprover.Title : null;

        if (response && response.length > 0) 
        {
            const regionalManager =
            {
                regionalManager : RegionalManager
            };

            return regionalManager;
        }
        else 
        {
            alert('No User found ... from fetchEmployee.ts')
            return initialFamRequisite;
        }
    }
    catch (error) {
        console.error('Error fetching employee data:', error);
        throw error;
    }
};

export default fetchRegionalManager;
