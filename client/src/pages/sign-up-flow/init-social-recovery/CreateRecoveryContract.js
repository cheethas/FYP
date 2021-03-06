import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

//components
import {Button} from "@material-ui/core";
import SignUpTitle from "../../../components/sign-up/SignUpTitle";
import SignUpParagraph from "../../../components/sign-up/SignUpParagraph";
import keyManager from "../../../services/KeyManager";
import CryptoManager from "../../../services/CryptoManager";
import RecoveryContractManager from "../../../services/RecoveryContractManager";

import {privateToAddress} from 'ethereumjs-util';

function CreateRecoveryContract(){
    const history = useHistory();

    const [keys, setKeys] = useState({});
    const [ethAddress, setEthAddress] = useState("");

    async function getKeys(){
        const _keys = keyManager.getKeysFromStorage("password");
        console.log(_keys);
        const addr = privateToAddress(Buffer.from(_keys.privKey, "hex"));
        const _ethAddress = `0x${addr.toString("hex")}`;
        setEthAddress(_ethAddress);
        setKeys(_keys);
    }

    useEffect(() => {
        getKeys();
    }, []);


    async function createRecoveryContract(){
        // handle the creation of the recovery contract
        RecoveryContractManager.createRecoveryContract(ethAddress);
        RecoveryContractManager.listenForRecoveryContractCreation(ethAddress, function(){
            alert("Recovery Contract Created Successfully");
        });
        
        // create all of the shares to be used for social recovery
        const mnemonic = keyManager.getMnemonicFromStorage("password");
        CryptoManager.createSharesAndKeepInStorage(mnemonic, 3, "password");
    }

    function createContract(evt){
        evt.preventDefault()
        createRecoveryContract()
    } 

    function goToNextPage(evt){
        evt.preventDefault();
        history.push("/setup/social");
    }

    return (
        <div>
            <SignUpTitle>
                Use Social Recovery
            </SignUpTitle>
            
            <SignUpParagraph>
                In case you have lost your seed phrase, you can recover your vault by asking your Trustees for help. To initiate recovery, all you need is consensus among your Trustees.
            </SignUpParagraph>
            
            <SignUpParagraph>
                To enroll with social recovery, you will be prompted to sign an Ethereum transaction, which will enable recovery for your account!
                <br/>
                This will cost you a fee depending on network usage.
                MetaMask will prompt you to to sign a transaction in order to generate a recovery contract.
            </SignUpParagraph>
            <SignUpParagraph>
                You must have funds within your ethereum address for the transaction to go through.
            </SignUpParagraph>
            {/* <SignUpParagraph>
                Your public and private keys are:
            </SignUpParagraph> */}
            {/* <SignUpParagraph>
                Public Key: {keys.pubKey}
            </SignUpParagraph>
            <SignUpParagraph>
                Private Key: {keys.privKey}
            </SignUpParagraph> */}
            <SignUpParagraph>
                <br/>
                This corresponds to the following Ethereum Address: <strong>{ethAddress}</strong>
            </SignUpParagraph>

            <SignUpParagraph>
                The current version requires you to import your account into metamask to continue! - An in-service wallet has not been created.
            </SignUpParagraph>

            <Button 
                variant="contained"
                onClick={createContract}
            >
                Create Contract
            </Button>
            <Button
                variant="containd"
                onClick={goToNextPage}
            >
                Continue
            </Button>

        </div>
    )
}

export default CreateRecoveryContract;