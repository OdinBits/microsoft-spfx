interface UserData 
{
    documentType: string | undefined;
    userDetected: number | undefined;
    manager: number | undefined;
    docId: string | undefined;
    company: string | undefined;
    costCenter: string | undefined;
    FAMCode: string | undefined;
    location:string | undefined;
    employeeNo:number | undefined;
    famCode: string | undefined;
    bussinessLine:string | undefined;
    region:string | undefined;
    approxValue:string | undefined;
    machineProjectNumber:string | undefined;
    classification:string | undefined;
    typeOfFOC:string | undefined;
    recordType:string | undefined;
    companyName:string | undefined;
    division:string | undefined;
    CSINumber:string | undefined;
    customerName:string | undefined;
    tentativeDateOfSupply:Date | undefined;
    noOfHours:string | undefined;
    remarks:string | undefined;
    attachmentUrl: { Url : string } | undefined;
    attachmentFile: { file : File , fileName : string }  | undefined
}



const initialUserData: UserData = 
{
  documentType: undefined,
  userDetected: undefined,
  docId: undefined,
  company: undefined,
  costCenter: undefined,
  FAMCode: undefined,
  location: undefined,
  employeeNo: undefined,
  famCode: undefined,
  bussinessLine: undefined,
  region: undefined,
  approxValue: undefined,
  machineProjectNumber: undefined,
  classification: undefined,
  typeOfFOC: undefined,
  recordType: undefined,
  companyName: undefined,
  division: undefined,
  CSINumber: undefined,
  customerName: undefined,
  tentativeDateOfSupply: undefined,
  noOfHours: undefined,
  remarks: undefined,
  attachmentUrl: undefined,
  attachmentFile: undefined,
  manager: undefined
}



export {UserData,initialUserData};