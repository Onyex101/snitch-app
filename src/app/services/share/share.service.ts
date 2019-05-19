import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private position;

  constructor() { }

  getPos() {
    return this.position;
  }

  setPos(data) {
    this.position = data;
  }
}
