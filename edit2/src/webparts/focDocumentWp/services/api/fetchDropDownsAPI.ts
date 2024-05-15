import { SPFI } from "@pnp/sp/presets/all";
import { DropDownCollection } from "../../interfaces/IDropDownCollections";

const fetchDataFromMultipleLists = async (sp: SPFI): Promise<DropDownCollection> => 
{
    try 
    {
        const listConfigurations = 
        [
            { listTitle: "Fam Code", column: "FamCode/FamCode", expandColumn: "FamCode" },
            { listTitle: "Bussiness Line", column: "BussinessLine/BussinessLine", expandColumn: "BussinessLine" },
            { listTitle: "Region", column: "Region/Region", expandColumn: "Region" },
            { listTitle: "Classification", column: "Classification/Classification", expandColumn: "Classification" },
            { listTitle: "Type of FOC", column: "TypeofFOC/TypeofFOC", expandColumn: "TypeofFOC" },
        ];

        const famCodeData = await fetchDataForConfiguration(sp, listConfigurations[0]);
        const bussinessLineData = await fetchDataForConfiguration(sp, listConfigurations[1]);
        const regionData = await fetchDataForConfiguration(sp, listConfigurations[2]);
        const classificationData = await fetchDataForConfiguration(sp, listConfigurations[3]);
        const typeofFocData = await fetchDataForConfiguration(sp, listConfigurations[4]);

        const dropDowns: DropDownCollection =
        {
            famCode: famCodeData,
            bussinessLine:bussinessLineData,
            region:regionData,
            classification: classificationData,
            typeofFoc:typeofFocData,
        };

        return dropDowns;
    } 
    catch (error) 
    {
        console.error("Error fetching data:", error);
        throw error;
    }
};

const fetchDataForConfiguration = async (sp: SPFI, config: any) => 
{
    const { listTitle, column, expandColumn } = config;
    try 
    {
        const data = await sp.web.lists.getByTitle(listTitle).items.select(column).expand(expandColumn)();
        const dropDownValues: string[] = data.map((item) => item[expandColumn]?.[expandColumn]);
        return dropDownValues;
    }
    catch(e)
    {
        console.log("fetchDropdown Data error", e)
    }
};

export default fetchDataFromMultipleLists;
