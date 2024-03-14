import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { GridTutorialList } from '../../interface/grid-tutorial-list';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() gridTutorialList: GridTutorialList[] = [];
  @Output() clickedMenu = new EventEmitter<boolean>();

  onClickMenu() {
    this.clickedMenu.emit(true);
  }
}