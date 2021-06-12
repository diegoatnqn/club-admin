import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../noticias.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  misNoticias: Array<any> = [];
  constructor(public noticiasService: NoticiasService) {
  }

  ngOnInit(): void {
    this.misNoticias = [{
      titulo: "New #1",
      cuerpo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut ligula nibh. Nunc euismod suscipit consectetur. Vivamus venenatis tristique neque, a lobortis ipsum viverra ut.",
      cover: "https://picsum.photos/400/400.jpg"
    },
      {
        titulo: "New #2",
        cuerpo: "Morbi accumsan et nunc eget vestibulum. Donec tempor ante lacus, a vestibulum dolor molestie nec. Vestibulum ante ipsum primis in faucibus",
        cover: "https://picsum.photos/400/400.jpg"
      },
    { titulo: "TESTING 3", cuerpo: "LORE IMPUSMMDmADdssasdad !", cover: "https://picsum.photos/400/400.jpg" },
    { titulo: "TESTING 4", cuerpo: "LORE IMPUSMMDmADasdasdadsddd !", cover: "https://picsum.photos/400/400.jpg" },
    { titulo: "TESTING 5", cuerpo: "LORE IMPUSMMDmAD dasdasddasd!", cover: "https://picsum.photos/400/400.jpg" },
    { titulo: "TESTING 6", cuerpo: "LORE IMPUSMMDmADaaaaaaaaaaa !", cover: "https://picsum.photos/400/400.jpg" }
    ]
    this.noticiasService.obtener().subscribe(noticias => {
      this.misNoticias = noticias["noticia"];
      this.misNoticias = this.misNoticias.reverse();
      this.misNoticias = this.misNoticias.slice(0, 2);
    });
    
    this.misNoticias = this.misNoticias.slice(0, 2);
  }

}
