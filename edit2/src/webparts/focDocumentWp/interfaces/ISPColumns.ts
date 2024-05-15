

const sharepointFieldMapping = 
{
    docId: "Title",
    userDetected: "RequesterId",
    manager:"ManagerId",
    documentType: "DocType",
    company: "Company",
    costCenter: "CostCenter",
    FAMCode: "FAMCode",
    location: "Location",
    employeeNo: "EmployeeNo",
    famCode: "FamCode0",
    bussinessLine: "BussinessLine",
    region: "Region",
    approxValue: "ApproxValue",
    machineProjectNumber: "MachineProjectNumber",
    classification: "Classification",
    typeOfFOC: "TypeOfFOC",
    recordType: "RecordType",
    companyName: "CompanyName",
    division: "Division",
    CSINumber: "CSINumber",
    customerName: "CustomerName",
    tentativeDateOfSupply: "TentativeDateOfSupply",
    noOfHours: "NoOfHours",
    remarks: "Remarks",
    attachmentUrl: "AttachedFileLinks"
} as const;

export default sharepointFieldMapping;