'use strict';

const axios = require("axios");

function YatMoneroLookup(opts = {}) {
    this.validEmojis = [];
    // this.debugMode denotes whether we use the live or the test API url
    this.debugMode = (opts.debugMode !== undefined) ? opts.debugMode : false;
    // this.remoteLookup determines whether we should retrieve the list of emojis from the Yat server
    this.remoteLookup = (opts.remoteLookup !== undefined) ? opts.remoteLookup : false;
    this.staticEmojiList = ["đļ","đŧ","đ","đĻ","đĢ","đˇ","đĻ","đĄ","đ","đˇ","đŧ","đī¸","đ¤§","âī¸","đĨ","đĨ","đ¤Ą","đē","đ","đ¯","đŦ","đī¸","đē","đž","đŊ","đĻ","đ´","đĻ","âĻī¸","đ­","đĻ","đ","đ","đ","đž","đ","đŋ","đ","đ","â","đģ","âĒī¸","â¨","âž","đĨ","đŽ","đŊ","đ","đĸ","đ¤","đ","đ¯","đĄ","đī¸","â","đą","đ","đēī¸","đĒ","đ¤","âī¸","đ","đ¤","đš","đž","đ","đ¨","đ¤","đĩ","đļ","đĨ","đĨ","â","đī¸","đī¸","đž","đ","đ","đ","đ","đ","đ¨","đ¸ī¸","đĒ","âī¸","âī¸","đž","đ","đĄ","đ¤","đŋ","âŖī¸","đ","đĩ","đŗ","đ¨ī¸","đĸ","đ§","đī¸","đĻ","đ­","đ","đĻ","đ","âī¸","đ","đ¤","đŊ","đ","đ ","đī¸","đ","đ","đ","đ§","đ","đ","đ","đŠ","đĄī¸","đ¤","đĩ","đ","đ­","đĒ","đ","đ","đ","âĄī¸","đ","đ¤ ","đ¸","â","đą","đ","đ¤","đĒ","đ","âī¸","đ","đ","đ","đˇ","đ","âĸī¸","đģ","đĻ","âĩ","đĻ","đŗ","đ","đ","đ¸","đŖ","đ","â","đ","đš","đĻ","âī¸","đ","âī¸","đ","đ","đĨ","đŽ","đ","đŊī¸","đĩ","đ­","đą","đšī¸","đī¸","đ","đģ","đ","â","đĻ","đī¸","đ","đ","đĨ","đŖ","đ°","đ","đī¸","đŽ","đ¯ī¸","đ","đ","đļ","đī¸","đŊ","đ","đ","đ","đ","đ","â­","đ","đĻ","đĻ","đ","đē","đĨ","đ","đ","đ","đ","đĒī¸","đŠ","đģ","đĨ","đ","đŽ","đĸī¸","đ","đĸ","đĄī¸","đĻ","đ","đˇ","âī¸","đ","đ","â","đĨ","âī¸","âī¸","đŧ","â¤ī¸","đ","đĨ","âī¸","đ¤","đ","âī¸","đ§","â","đž","đ","đŧ","đĒ","đą","đ","đ","đ§","đŽ","đŧ","đŖ","đ¯","đĻ","đĨ","đ","đ","đī¸","đĨ","âŗ","đ","đĨ","đ¤ŗ","đ°","âī¸","đī¸","đ","đĨ","đē","đŋ","đ","đ","đ","đ°","đą","đĻ","đ","đ","đŊ","đ","đĨ","đ","â","đ","đ","đ","đĩ","âĒ","đ","đļ","đ","đ","đŖ","đ","â°ī¸","đŠ","đ","đ","đ","đ°","đ","âī¸","đŦ","đ","đ§","đ¨","đŋ","đ","đĨ","đŦ","đĨ","đ­","âŊ","đģ","đī¸","â°","â","đ","đ˛","đĻ","đ¤","â ī¸","đ","đĨ","đĻ","â ī¸","đ","đĨ","âģī¸","đļ","đ","đ","đĄ","â","đ ","đ°","đ¸","đą","â°ī¸","đ","đ","â¯ī¸","đ","đē","đ","đ ","đ¯","đĩ","đ¯","đĻ","đ¤ĸ","đ","đĩ","đŗ","đļī¸","đĢ","âī¸","â","â","đ","â","đŋ","đĻ","đĨ","đ","đ°","đ","đą","đŊ","đī¸","đ","đ¯","đĨ","đĢ","đŧī¸","đ­","đ¸","đē","đ","đ","â¸ī¸","đŖ","â","â ī¸","đ","đˇ","â","â¸ī¸","đ","â","đ","đ","đ","đĻ","đ","đ","đ","đŦ","â","đ","đ","đ¸","đ","đ","đ ","â","đŗī¸","đ","đ","đ","đŦ","đ§","đš","đŠ","đ","đĨ","âĄ","đ","đ","đ","đī¸","đĸ","đ","đ","đī¸","đ","đĨ","â","đ­","đĸ","đˇī¸","đ","đĒ","đ¨","đ˛","âī¸","đ","đ","đ˛","đ´","đĻ","đ","đ","â","đģ"];

    console.log(this);

    this.apiUrl = (this.debugMode == false) ? "https://a.y.at" : "https://api-dev.yat.rocks";
    
    // These properties are functions defined further below in this file
    this.getSupportedEmojis = getSupportedEmojis
    this.isValidYatCharacter = isValidYatCharacter
    this.lookupMoneroAddresses = lookupMoneroAddresses
    this.testEmojisAgainstUnicodePropertyEscape = testEmojisAgainstUnicodePropertyEscape
    this.isValidYatHandle = isValidYatHandle

    
    if (this.remoteLookup == true) {
        this.getSupportedEmojis().then((response) => {
            this.validEmojis = Object.values(response); // properly clone array using spread operator
        })
    } else {
        this.validEmojis = this.staticEmojiList;
    }
    
    this.getBasePath = (() => {
        return this.apiUrl;
    })

    return this
}

function isEmojiCharacter(char) {
    return /\p{Emoji}/u.test(char);   
}

function isValidYatHandle(handle) {
    console.log("Invoked isValidYatHandle:", handle)
    if (typeof(handle) !== 'string') {
        return false;
    }
    // Remember that an emoji is two-bytes in length
    if (handle.length > 10 || handle.length < 1) {
        return false;
    }
    
    // Iterate through all characters to ensure they're valid emojis 
    for (const c of handle) {
        if (/\p{Extended_Pictographic}/u.test(c) == false) {
            return false
        }
    }

    // Iterate through all known valid Yat characters and check that they are members of 
    // This is commented out until it's possible for us to get a full list of emoji mapping
    // for (const c of handle) {
    //     if (this.isValidYatCharacter(c) == false) {
    //         return false
    //     }
    // }

    return true;
}

function getSupportedEmojis() {
    let instance = this;
    return new Promise((resolve, reject) => {
        if (instance.remoteLookup == true) {
            let endpoint = `${instance.apiUrl}/emoji`;
            try {
                axios.get(endpoint)
                    .then((response) => {
                        console.log("Successfully retrieved supported emojis");
                        resolve(response.data);
                    }).catch((error) => {
                        console.log("Unable to retrieve supported emojis -- in this instance we could consider falling back to the originally supported emojis by Yat");
                        // we could resolve with base emoji list here                        
                        //self.validEmojis = [...validEmojis]; // properly clone array using spread operator
                        resolve(validEmojis);
                    })
            } catch (error) {
                reject(error)
            }
        }
        
        resolve(instance.staticEmojiList)
    })
}


function isValidYatCharacter(char) {
    const self = this;
    let response = self.validEmojis.includes(char);
    console.log(`Checking ${char} against valid emojis`, response)
    return response;
}

// Returns empty object when successful but no data is set. Otherwise, returns object with key => value pair - eg { "0x1001" => "moneroaddress", "0x1002" => "monerosubaddress" }
// *  
function lookupMoneroAddresses(yat) {
    const self = this;
    // 0x1001 is a Monero address, 0x1002 is a Monero subaddress
    let endpointString = `${self.apiUrl}/emoji_id/${yat}?tags=0x1001,0x1002`;
    let endpoint = encodeURI(endpointString);
    return new Promise((resolve, reject) => {
        axios.get(endpoint, { crossDomain: true })
            .then((response) => {
                console.log("Looking up Yat: " + yat);
                console.log(self.debugMode);
                // This path will execute when a Yat that exists is looked up. 
                let returnData = new Map();
                let resultArray = Object.values(response.data.result);

                resultArray.forEach(function (result) {
                    returnData.set(result.tag, result.data);
                })

                resolve(returnData);

            }).catch(function (error) {
                // We could land up here because a Yat does not exist, or a networking error / server error is encountered -- non-existent Yat handles return a 404
                // Return the error object to the invocator
                reject(error);
            });
    });
}

// This function checks that all returned emoji characters have appropriate properties to be able to parse handles without error. 
// TODO: Refactor into unit test -- if this stops working, it means that the underlying browser / node version does not correctly process regular expressions 
// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
// Remember that [0..9], *, #, digits will match true when checking their properties to see if they are 
function testEmojisAgainstUnicodePropertyEscape() {
    console.log("Invoking testEmojisAgainstUnicodePropertyEscape");
    //console.log(typeof(this.validEmojis));
    let alerted = 0;
    
    let cnt = 0;
    for (let i = 0; i < this.validEmojis.length; i++) {
        //console.log(regexpEmojiPresentation.match(this.validEmojis[i]));
        console.log(this.validEmojis[i]);
        //let match = /\p{Emoji}/u.test(this.validEmojis[i]);
        let match = isEmojiCharacter(this.validEmojis[i]);
        //console.log("Inline regexp test:", /\p{Emoji}/u.test(this.validEmojis[i]));
        if (match !== true) {
            alerted++;
        }
        //console.log("Test flower");
        //console.log(regexpEmojiPresentation.test("đē"));
        cnt++;
    }
    console.log(cnt);

}

let obj = { YatMoneroLookup };

export default obj;
