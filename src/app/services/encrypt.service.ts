import { Injectable } from '@angular/core';
import { JSEncrypt } from 'jsencrypt';
 
@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  encryptData(publicKey: string, data: string): string | null {
    try {

      console.log('Public Key:', publicKey); // Log the public key 
      console.log('Data to encrypt:', data); // Log the data to encrypt

      const encrypt = new JSEncrypt(); encrypt.setPublicKey(publicKey); // Verify if the public key is set correctly 
      if (!encrypt.getKey()) { 
        console.error('Invalid Public Key'); 
        return null;
       } 
      const encrypted = encrypt.encrypt(data); 
      return encrypted ? encrypted : null;
    } catch (error) {
      console.error('Encryption Error: Invalid Public Key', error);
      return null;
    }
  }
}