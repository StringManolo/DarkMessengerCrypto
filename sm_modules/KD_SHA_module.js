import crypto from "crypto";

const KD_SHA = (key, size) => {
  if (key.length >= size) {
    console.log("KD_5UM: Returning key, already expected size");
    return key;
  }

  const dD = "abcdefghijklmnopqrstuvwxyz"
  let derivated = crypto.createHash('sha512').update(key).digest('hex');
  while (true) {
    for (let i = 0; i < derivated.length; ++i) {
      //console.log(`Derivating ${derivated[i]} === HASH_5UM(derivated[${i}])`);
      derivated += crypto.createHash('sha512').update((derivated[i])).digest('hex');
       
      if (derivated.length >= size) {
        return derivated.substring(0, size); 
      }
    }
  }

  return derivated.substring(0, size); //todo: reverse the key
}

export { KD_SHA };
