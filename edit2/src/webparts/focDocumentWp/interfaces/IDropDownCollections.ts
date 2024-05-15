interface DropDownCollection
{
    famCode : string[] | undefined ;
    bussinessLine : string[] | undefined ;
    region : string[] | undefined ;
    classification : string[] | undefined ;
    typeofFoc : string[] | undefined  ;
}

const InitialDropDowns : DropDownCollection =
{
    famCode: [],
    bussinessLine: [],
    region: [],
    classification: [],
    typeofFoc: []
}

export { DropDownCollection , InitialDropDowns}