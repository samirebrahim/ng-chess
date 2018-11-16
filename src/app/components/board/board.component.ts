import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class BoardComponent {
   rows = [8, 7, 6, 5, 4, 3, 2, 1];
   columns = 'ABCDEFGH'.split('');
  private clickCount = 0;
  private pathStart;
  private pathEnd;
  constructor(@Inject(DOCUMENT) document, private boardService: BoardService) { }

  cellClicked(event) {
    const element = event.path[0];
    const oldPath = document.getElementsByClassName('animated');
    if (this.clickCount === 0) {
      this.clickCount++;
      this.pathStart = element.id;
      this.moveKnight(element, 0, true);
      while (oldPath.length > 0) {
      oldPath[0].classList.remove('animated');
    }
    } else if (this.clickCount === 1) {
      this.clickCount = 0;
      this.pathEnd = element.id;
      this.getPath();
    }
  }

  moveKnight(element, index, first?) {
    const tempKnight = document.getElementById('knight');
    if (tempKnight) {
      tempKnight.parentNode.removeChild(tempKnight);
    }
    const knight = document.createElement('img');
    const pathNum = document.createElement('span');
    if (!first) {
      pathNum.textContent = index + 1;
      pathNum.className = 'pathNum';
      element.appendChild(pathNum);
    }
    knight.src = '../../assets/wN.png';
    knight.id = 'knight';
    element.classList.add('animated');
    element.appendChild(knight);
  }
  getPath() {
    this.boardService.getShortestPath(this.pathStart, this.pathEnd).subscribe(
      (data) => {
        if (data) {
          const path = data.toString().replace(/[^a-zA-Z0-9-,]/g, '').split(',');
          for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
              const cell = document.getElementById(path[i]);
              this.moveKnight(cell, i);
            }, i * 1000);
          }
        }
      });
  }
}
