const multihash = require('multihashes');
const base58 = require('bs58');
const base64url = require('base64url');

const isB58EncodedMultihash = (hash: string): boolean => {
  try {
    const buffer = Buffer.from(base58.decode(hash));
    multihash.decode(buffer);
    return true;
  } catch (e) {
    return false;
  }
};

const isB64EncodedMultihash = (hash: string): boolean => {
  try {
    const buffer = base64url.toBuffer(hash);
    multihash.decode(buffer);
    return true;
  } catch (e) {
    return false;
  }
};

const base58EncodedMultihashToBytes32 = (base58EncodedMultihash: string) => {
  return (
    '0x' +
    multihash
      .toHexString(multihash.fromB58String(base58EncodedMultihash))
      .substring(4)
  );
};

const base64EncodedMultihashToBytes32 = (base64EncodedMultihash: string) => {
  return (
    '0x' +
    multihash
      .toHexString(base64url.toBuffer(base64EncodedMultihash))
      .substring(4)
  );
};

const bytes32EnodedMultihashToBase58EncodedMultihash = (
  bytes32EncodedMultihash: string
) => {
  return multihash.toB58String(
    multihash.fromHexString('1220' + bytes32EncodedMultihash.replace('0x', ''))
  );
};

export default {
  isB58EncodedMultihash,
  isB64EncodedMultihash,
  base58EncodedMultihashToBytes32,
  base64EncodedMultihashToBytes32,
  bytes32EnodedMultihashToBase58EncodedMultihash
};
