import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { Storage, getDownloadURL, listAll, ref, uploadBytes, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Foto } from '../interfaces/foto';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private dataRef = collection(this.firestore, 'fotos');

  constructor(private storage: Storage, private firestore: Firestore, private auth: AuthService) { }

  async subirImg(cameraFile: Photo, fotoType: string): Promise<string | null> {
    return new Promise<string>((resolve, reject) => {
      this.auth.getUser().then(async user => {
        const path = `fotos/${fotoType}-${user?.email}-${Date.now()}.jpeg`;
        const storageRef = ref(this.storage, path); // get a reference to the storage bucket
        try {
          await uploadString(
            storageRef,
            cameraFile?.base64String || '',
            'base64'
          ); // upload the image to the storage bucket
          const imageUrl = await getDownloadURL(storageRef);
          const foto = {
            id: '',
            url: imageUrl,
            user: user?.email,
            tipo: fotoType,
            fecha: Date.now()
          }// get the image url
          //const userDocRef = doc(this.firestore, `fotos`); // get the user's document reference
          const docs = doc(this.dataRef);
          foto.id = docs.id;
          await setDoc(docs, foto);
          //await setDoc(userDocRef, { foto }); // update the user's document with the image url
          resolve(imageUrl); // resolve with the image url
        } catch (e) {
          reject(null); // reject with empty string on error
        }
      });
    });
  }

  traer(): Observable<Foto[]> {
    return new Observable<Foto[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const especialidades: Foto[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Foto;
          especialidades.push(one);
        });
        observer.next(especialidades);
      });
    });
  }

}


