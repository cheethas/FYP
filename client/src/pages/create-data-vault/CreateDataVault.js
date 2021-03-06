import React, {useState, useEffect} from "react";
import CASManager from "../../services/CasManager";


/**Create Data Vault
 * 
 * What must be done?
 *  1. Create an IPNS endpoint to connect to from this device
 *  2. Add a file to IPNS that is like a .git file
 *  3. Commit the directory to that endpoint.
 *  4. Add the ipns endpoint to the attributes of the users DID
 */
function CreateDataVault(){

    useEffect(() => {
        CASManager.initTextileForUser();
    });
    
    return (
        <div>CREATE DATA VAULT</div>
    )
}

export default CreateDataVault;

