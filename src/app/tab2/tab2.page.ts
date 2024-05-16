import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Foto } from '../interfaces/foto';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { LogPage } from '../pages/log/log.page';
import { h } from 'ionicons/dist/types/stencil-public-runtime';
import { UserService } from '../services/user.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public fotos: Foto[] = [];
  public user: User | undefined | null;
  private focusedElementId?: string;

  constructor(private imageService: ImageService, private auth: AuthService, private userService: UserService, private loadingController: LoadingController, private router: Router) { }

  ngOnInit(): void {
    this.imageService.traer().subscribe(data => {
      this.fotos = data;
      this.ordenarPorFecha(this.fotos);
    });
    this.auth.getUserLogged().subscribe(user => {
      this.userService.getUserByEmail(user?.email!).subscribe(u => this.user = u);

    });
  }

  getDate(fecha: string) {
    const date = new Date(fecha);
    return date.getDate() + '/' + date.getMonth() + '/' + (date.getFullYear()).toString().split("0")[1];
  }

  ordenarPorFecha(fotos: Foto[]) {
    fotos.sort((a: Foto, b: Foto) => {
      const horaA = new Date(a.fecha);
      const horaB = new Date(b.fecha);
      return horaB.getTime() - horaA.getTime();
    });
  }

  async vote(photo: Foto, cardId: string) {
    console.log(photo);
    console.log(this.user);

    if (this.checkVotes(photo)) {
      console.log("Agregando like");
      photo.votes.push(this.user?.id!);
      this.user?.votos.push(photo.id);
    } else {
      console.log("Sacando like");
      let indice = photo.votes.indexOf(this.user?.id!);
      if (indice !== -1) {
        photo.votes.splice(indice, 1);
        const indiceUser = this.user?.votos.indexOf(photo.id);
        if (indiceUser !== -1) {
          this.user?.votos.splice(indiceUser!, 1);
        }
      }
    }

    await this.imageService.votePhoto(photo, this.user!);
    await this.updatePhotos();

    setTimeout(() => {
      this.presentLoading();
      const focusedCard = document.getElementById(cardId) as HTMLElement;
      if (focusedCard) {
        focusedCard.focus();
      }
    }, 100);

  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 100,
    });
    await loading.present();
  }

  checkVotes(photo: Foto): boolean {
    let result = true;
    if (this.user && photo && photo.votes && photo.votes.includes(this.user?.id!)) {
      result = false;
    }
    return result;
  }


  async updatePhotos() {
    this.imageService.traer().subscribe(data => {
      this.fotos = data;
      this.ordenarPorFecha(this.fotos);
    });
  }

  goResultados() {
    this.router.navigate(['tabs/tab3']);
  }
}
