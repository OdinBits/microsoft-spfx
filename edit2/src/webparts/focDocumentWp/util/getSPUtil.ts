import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

let _sp: SPFI | undefined = undefined;

export const getSP = (context: WebPartContext): SPFI => 
{
    if (context !== undefined) 
    {
        // You must add the @pnp/logging package to include the PnPLogging behavior; it is no longer a peer dependency
        // The LogLevel set's at what level a message will be written to the console
        _sp = spfi().using(SPFx(context));
    }

    // Use a conditional check to avoid non-null assertion
    if (_sp !== undefined) 
    {
        return _sp;
    } 
    else 
    {
        // Handle the case where _sp is undefined
        throw new Error("SharePoint context is not available. Unable to initialize SPFI.");
    }
};
