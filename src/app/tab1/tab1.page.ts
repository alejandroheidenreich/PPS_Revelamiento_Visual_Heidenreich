import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageService } from '../services/image.service';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private imageService: ImageService) { }

  async sacarFotoLinda() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Foto Linda",
      promptLabelPicture: "Tomar Foto",
      promptLabelPhoto: "Desde Galeria"
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

    if (image) {
      this.imageService.subirImg(image, "linda");
    }
    // .then(res => console.log(res));
  }

  async sacarFotoFea() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      promptLabelHeader: "Foto Fea",
      promptLabelPicture: "Tomar Foto",
      promptLabelPhoto: "Desde Galeria"
    });

    if (image) {
      this.imageService.subirImg(image, "fea");
    }
  }

}




