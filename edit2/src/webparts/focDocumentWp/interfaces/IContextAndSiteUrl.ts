import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IContextAndSiteUrl 
{
  context:WebPartContext ;
  siteUrl:string ;
  
}

export default IContextAndSiteUrl;
