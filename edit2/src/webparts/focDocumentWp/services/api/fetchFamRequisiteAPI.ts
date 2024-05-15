import { getSP } from "../../util/getSPUtil";
interface famRequisite 
{
    recordType : string | undefined;
    companyName : string | undefined;
    division : string | undefined;
}

const initialFamRequisite : famRequisite = 
{
    recordType : undefined,
    companyName : undefined,
    division : undefined,
}

// parameters are wrong correct it here 
const fetchFamRequisite = async (param:{value: string, context : any}): Promise<famRequisite> => 
{
    const { value , context } = param;

    const sp = getSP(context);

    try 
    {
        const filterQuery = `FamCode eq '${value}'`;

        const response = await sp.web.lists.getByTitle('FamCodeRequisites').items.filter(filterQuery)
            .select("RecordType,CompanyName,Division")();

        const rercordType = response[0].RecordType ? response[0].RecordType : null;
        const companyName = response[0].CompanyName ? response[0].CompanyName : null;
        const division = response[0].Division ? response[0].Division : null;

        if (response && response.length > 0) 
        {
            const famCodeRequisite =
            {
                    recordType : rercordType,
                    companyName : companyName ,
                    division : division,
            };
            return famCodeRequisite;
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

export default fetchFamRequisite;
