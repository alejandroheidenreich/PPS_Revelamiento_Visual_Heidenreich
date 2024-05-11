import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Foto } from '../interfaces/foto';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public fotos: Foto[] = [];
  public user: string | undefined | null;
  constructor(private imageService: ImageService, private auth: AuthService) { }

  ngOnInit(): void {
    this.imageService.traer().subscribe(data => {
      this.fotos = data;
      this.ordenarPorFecha(this.fotos);
    });
    this.auth.getUser().then(user => this.user = user?.email)
  }

  ordenarPorFecha(fotos: Foto[]) {
    fotos.sort((a: Foto, b: Foto) => {
      // Convertir las horas a objetos Date para comparar
      const horaA = new Date(`${a.fecha}`);
      const horaB = new Date(`${b.fecha}`);

      // Comparar las horas
      return horaA.getTime() - horaB.getTime();
    });
  }

}
