import { Component, Input, OnInit } from '@angular/core';
import { GridTutorialList } from '../../interface/grid-tutorial-list';
import { GridTutorialListService } from '../../services/grid-tutorial-list/grid-tutorial-list.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  @Input() gridTutorialList: GridTutorialList[] = [];

  gridTutorialComponents: { [key: string]: any; } = {}

  constructor(
    private gridTutorialListService: GridTutorialListService
  ) { }

  ngOnInit(): void {
    this.gridTutorialComponents = this.gridTutorialListService.components;

  }
}
