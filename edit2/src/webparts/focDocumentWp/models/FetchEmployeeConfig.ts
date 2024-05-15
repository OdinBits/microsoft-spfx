import { SPFI } from "@pnp/sp";

interface contextAndSp 
{
    currentUser: any;
    sp: SPFI;
}

export default contextAndSp;