import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
  
})
export class NosotrosComponent implements OnInit {
    album: Array<any> = [];
  constructor(private _lightbox: Lightbox) {
    for (let i = 1; i < 4; i++) {
      const src = '/assets/image-' + i + '.jpg';
      const caption = 'Image ' + (i+1) + ' caption here';
      const thumb = '/assets/image-' + i + '-thumb.jpg';
      const album = {
        src: src,
        caption: caption,
        thumb: thumb
      };

      this.album.push(album);
    }
  }

  ngOnInit(): void {
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this.album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}
