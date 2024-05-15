import { getSP } from "../../util/getSPUtil";
interface bussinessManager 
{
    bussinessManager: string | undefined;
}

const initialFamRequisite : bussinessManager = 
{
    bussinessManager: undefined
}

// parameters are wrong correct it here 
const fetchBussinessManager = async (param:{value: string, context : any}): Promise<bussinessManager> => 
{
    const { value , context } = param;

    const sp = getSP(context);

    try 
    {
        const filterQuery = `BussinessLineCode eq '${value}'`;

        const response = await sp.web.lists.getByTitle('Bussiness Line').items.filter(filterQuery)
            .select("OptionalApprover/Title").expand("OptionalApprover")();

        const BussinessManager = response[0].OptionalApprover ? response[0].OptionalApprover.Title : null;

        if (response && response.length > 0) 
        {
            const bussinessManager =
            {
                bussinessManager : BussinessManager
            };

            return bussinessManager;
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

export default fetchBussinessManager;
