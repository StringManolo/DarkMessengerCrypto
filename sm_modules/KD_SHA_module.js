import crypto from "crypto";


const performance = false;
let perfCounter = 1;
let perfDate;
const perf = (text) => {
  if (performance) {
    if (perfCounter % 2 !== 0 ) {
      perfDate = new Date().getTime();
      if (text) console.log(`(starting time)->${text}`);
    } else {
      console.log(`(${new Date().getTime() - perfDate} ms)->${text || "done"})\n`);
    }
  ++perfCounter
  }
}


const BASE64 = (text, times) => {
  let res = "";
  for (let i = 0; i < times; ++i) {
    res += Buffer.from(text).toString("base64");
  }
  return Buffer.from(res).toString("base64");
}

const HEX = (text, times) => {
  let res = "";
  for (let i = 0; i < times; ++i) {
    res += Buffer.from(text).toString("hex");
  }
  return Buffer.from(res).toString("hex");
}




const KD_SHA = (key, size) => {
  if (key.length >= size) {
    console.log("KD_5UM: Returning key, already expected size");
    return key;
  }

  const dD = "abcdefghijklmnopqrstuvwxyz"
  perf(`Creating sha512 hash as hex ...`);
  let derivated = crypto.createHash('sha3-512').update(key).digest('hex');
  perf();
  while (true) {
    perf(`Starting for loop`);
    for (let i = 0; i < derivated.length; ++i) {
      //console.log(`Derivating ${derivated[i]} === HASH_5UM(derivated[${i}])`);
      derivated += BASE64(crypto.createHash('sha-256').update((derivated[i])).digest('hex'), 1); // 1 layers of b64 for each layer of sha512 (to improve performance)
      derivated += HEX(crypto.createHash('sha3-512').update((derivated[i])).digest('hex'), 1); // 1 layers of HEX for each layer of sha512 (to improve performance)
      derivated += BASE64(crypto.createHash('sha-512').update((derivated[i])).digest('hex'), 1); // 1 layers of b64 for each layer of sha512 (to improve performance)
      derivated += HEX(crypto.createHash('sha3-512').update((derivated[i])).digest('hex'), 5000); // 5009 layers of HEX for each layer of sha512 (to improve performance)



      if (derivated.length >= size) {
        return derivated.substring(0, size); 
      }
    }
    perf(`End FOR loop`);
  }

  return derivated.substring(0, size); //todo: reverse the key
}



export { KD_SHA };





