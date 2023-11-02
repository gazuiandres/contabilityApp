import CryptoJS from 'crypto-js';
import config from '../config';

class EncryptManager {
  static encrypt(data: string) {
    const dataToString = `${data}`;
    return CryptoJS.AES.encrypt(dataToString, config.encryptSecret).toString();
  }

  static decrypt(data: string, type: string) {
    const decrypted = CryptoJS.AES.decrypt(data, config.encryptSecret).toString(CryptoJS.enc.Utf8);
    if (type === 'number') {
      return Number(decrypted);
    }

    return decrypted;
  }
}

export default EncryptManager;
