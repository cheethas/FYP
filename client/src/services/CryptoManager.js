import { toEthereumAddress } from 'did-jwt';
import Crypto from "crypto";

import {hdkey} from "ethereumjs-wallet";
import { encrypt } from '@textile/hub';
import eccrypto from "eccrypto";
import fs from "fs";
import slip39 from "slip39";
import { userInfo } from 'os';
import CASManager from './CasManager';
import CryptoJS from "crypto-js";
import * as eccryptoJS from "eccrypto-js";

// import EthCrypto from 'eth-crypto';
import secrets from "secrets.js";

const bip39 = require("bip39");



class CryptoManager {

    constructor(){
        this.generateMnemomic = this.generateMnemomic.bind(this);
        
    }

    generateMnemomic(){
        let mnem = bip39.generateMnemonic();
        return mnem;
    }

    /**Get Buffer at index
     * 
     * Gets the private key bytes at a particular hdkey index
     * 
     * @param {*} mnemonic 
     * @param {*} index 
     */
    async getPublicPrivateKeyAtIndex(mnemonic, index){
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = hdkey.fromMasterSeed(seed);
        //NOTE: 60 is specific to eth, check if there is a sidetree unique version
        const hdPath = `m/44'/60'/0'/0/${index}`;
        const addrNode = root.derivePath(hdPath);
        // return addrNode.privateKey;
        return {
            pubKey: addrNode._hdkey._publicKey.toString("hex"),
            privKey: addrNode._hdkey._privateKey.toString("hex")
        };
    }

    /**Get Public Private for Access Groups
     * 
     * When uploading files, this method chooses the account encryption keys to use
     * from BIP32 to encrypt files.
     * 
     * @param {String} mnemonic 
     * @param {Number} index 
     * @returns 
     */
    async getPubPrivForAccessGroups(mnemonic, index){
        const seed = await bip39.mnemonicToSeed(mnemonic);
        const root = hdkey.fromMasterSeed(seed);
        const hdPath = `m/44/60'/${index}'/0`;
        const addrNode = root.derivePath(hdPath);

        return {
            pubKey: addrNode._hdkey._publicKey.toString("hex"),
            privKey: addrNode._hdkey._privateKey.toString("hex")
        };
    }

    /**
     * 
     * @param {*} publicKey 
     */
    async createEthAddressFromPubKey(publicKey){
        return toEthereumAddress(publicKey);
    }


    /**Encrypt File for IPFS
     * 
     * Takes a file that is going to be stored on IPFS, generates an ephemeral key,
     * encrypts it and then passes the file to 
     * @param {File} file
     * @returns {Object} {
     *  encryptedFile,
     *  ephKey
     * } 
     */
    async encryptFileForIPFS(file, isPath){
        // get file if from path or passed as buffer
        var fileData = null;
        console.log(isPath);
        if (isPath){
            fileData = fs.readFileSync(file);
        } else{
            fileData = file;
        }

        // ephemeral key
        const ephKey = Crypto.randomBytes(16).toString("hex");
        const iv = Crypto.randomBytes(8).toString("hex");
        const encryptedFile = this.encryptWithAES(fileData, ephKey, iv);
        // concat buffers for upload
        const encryptedBuffer = Buffer.concat([
            Buffer.from(iv, "utf8"),
            Buffer.from(encryptedFile, "utf8")
        ]);
        
        return {
            encryptedBuffer,
            ephKey
        }
    }

    /**Encrypt with AES
     * 
     * Construct an AES cipher using a given ephemeral key and iv values
     * returns the encrypted buffer in hex format
     * @param {Buffer} buffer 
     * @param {Buffer(String)} ephKey 
     * @param {Buffer(String)} iv 
     */
    encryptWithAES(buffer, ephKey, iv){
        const cipher = Crypto.createCipheriv("aes-256-ctr", ephKey, iv);
        const data = cipher.update(buffer);
        const encrypted = Buffer.concat([data, cipher.final()]);
        return encrypted.toString("hex");
    }

    /**Decrypt Symmetric Buffer
     * 
     * Takes the buffer returned from IPFS and slices it into it's seperate components
     *  - iv 
     *  - file buffer
     * Once seperated, these are used as parameters in a decryption method which is returned
     * 
     * @param {Buffer} buffer 
     * @param {String} ephemeralKey
     * 
     * @returns {Buffer} filePlaintext
     */
    decryptSymmetricBuffer(buffer, ephemeralKey){
        const iv = buffer.slice(0, 16).toString("utf8");
        const content = buffer.slice(16).toString("utf8");
        const contentBuffer = Buffer.from(content, "hex");

        return cryptoManager.decryptWithAES(contentBuffer, ephemeralKey, iv);
    }

    /**Decrypt with AES
     * 
     * Creates an AES cipher using the provided ephemeral key and iv value
     * returns the decrypted version of the provided buffer
     * 
     * @returns {Buffer} decryptedBuffer
     * 
     * @param {Buffer} buffer 
     * @param {Buffer} ephKey 
     * @param {Buffer} iv 
     */
    decryptWithAES(buffer, ephKey, iv){
        const cipher = Crypto.createCipheriv("aes-256-ctr", ephKey, iv);
        const data = cipher.update(buffer);
        const decrypted = Buffer.concat([data, cipher.final()]);
        return decrypted;
    }


    async assymetricEncrypt(publicKey, data){
        var buffer;
        if (typeof publicKey === "string"){
            buffer = Buffer.from(publicKey, "hex");
        }else if (!Buffer.isBuffer(publicKey)){
            buffer = Buffer.from(publicKey);
        } else if (Buffer.isBuffer(publicKey)) {
            buffer = publicKey
        } 

        console.log(Buffer.isBuffer(buffer));
        // return await eccrypto.encrypt(Buffer.from(publicKey, "hex"), Buffer.from(data));
        return await eccrypto.encrypt(buffer, Buffer.from(JSON.stringify(data)));
        // return await eccryptoJS.encrypt(buffer, Buffer.from(data));
    }

    async assymetricDecrypt(privateKey, data){
        // read and parse the encrypted data so that it can be interpreted
        // const g = JSON.stringify(data);
        // const actualData = JSON.parse(g, (k,v) => {
        //     return v.type === "Buffer" ? Buffer.from(v.data, "hex") : v
        // });
        // console.log(Buffer.from(privateKey, "hex"));
        // return (await eccrypto.decrypt(Buffer.from(privateKey, "hex"), data)).toString();
        const g = JSON.stringify(data);
        const actualData = JSON.parse(g, (k,v) => { 
            return v.type === "Buffer" ? Buffer.from(v.data, "hex") : v
        });
        return (await eccrypto.decrypt(Buffer.from(privateKey, "hex"), actualData)).toString();
    }


    async asymDecryptFiles(privateKey, data){
        console.log(Buffer.from(privateKey, "hex"));
        return (await eccrypto.decrypt(Buffer.from(privateKey, "hex"), data)).toString();
    }


    /**
     * ======================================================================================================================
     * The following section deals with creating and distributing shards across the network
     * 
     * At the moment all shares will be encoded as groups of similar sizes. This method will be adjusted in future versions
     * to include properly segmented groups.
     * ======================================================================================================================
     */
    async createSharesAndKeepInStorage(mnemonic, threshold, password="password"){
        // create shares
        const secretHex = await secrets.str2hex(mnemonic);
        const shares = await secrets.share(secretHex, 10, 3);
        
        // convert to JSON so it can be strinified and stored reliably
        const sharesObj = {
            shares
        }

        // encrypt and store
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(sharesObj), password);
        localStorage.setItem("shares", encrypted);
    }


    async getSharesFromStorage(password="password"){
        // get from storage and decrypt
        const encryptedShares = localStorage.getItem("shares");
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedShares, password);
        
        // get JSON string
        const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8)
        
        // return from JSON object
        return JSON.parse(decrypted).shares;
    }

    async createShardsBasedOnThreshold(){

    }


    /**
     * TODO: index to be stored inside the recovery smart contract
     * @param {Buffer} publicKey 
     * @param {int} index
     * @param {String} addressToProtect
     * 
     * @returns {String} ipfs-CID of share 
     */
    async mintNewShard(publicKey, index, addressToProtect){
        // TODO: should the index be stored offline, or should it be stored with the other shards
        const shares = await this.getSharesFromStorage("password");
        console.log(shares);

        const personalShare = {
            share: shares[index],
            user: addressToProtect,
            type: "recoveryShare"
        }
        console.log(personalShare)
        console.log(publicKey)
        const encryptedShare = await this.assymetricEncrypt(publicKey, JSON.stringify(personalShare));
        console.log(encryptedShare);
        console.log(JSON.stringify(encryptedShare));
        
        // create an object to comply with the ERC721 metadata standard
        const metadata = {
            "name": "Recovery Share",
            "description": `Share to protect ${addressToProtect}`,
            "data": encryptedShare
        };

        console.log(metadata);
        console.log(JSON.stringify(metadata));
        
        const cid = await CASManager.addFileToIpds(JSON.stringify(metadata));
        return cid;
    }

    /**Recombine for secret
     * 
     * Takes an array of shares as input and returns the seed phrase of the user as output
     * 
     * @param {String[]} shares 
     */
    recombineForSecret(shares){
        return secrets.hex2str(secrets.combine(shares));
    }


}
const cryptoManager = new CryptoManager();
export default cryptoManager;