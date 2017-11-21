import { Component, OnInit, Input, ElementRef, ContentChild, Renderer2, Output, EventEmitter } from '@angular/core';

import { Option } from '../../model/product.model';
import { FilterService } from '../../shared/filter.service';


@Component({
  selector: 'vs-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.sass']
})
export class OptionComponent implements OnInit {
  @Input() option: Option;
  @Input() type: string;
  @Input() index: number;
  @Output() title = new EventEmitter<string>();
  public hovered = false;
  public missed = false;


  constructor(private _filterService: FilterService) {
  }

  ngOnInit() {
    this._filterService.getItem().subscribe((item) => {
      this.filterOption(item);
    });
  }

  changeState(type: string, hovered: boolean) {
    if (type === 'color') {
      this.hovered = hovered;
    }
  }

  private filterOption(missItem) {
    for (const item in missItem) {
      if (missItem[item] !== null) {
        const missing = missItem[item].some(elem => elem === this.option.title);
        if (missing) {
          this.missed = missing;
          return;
        }

        this.missed = missing;
      }
    }
    this.missed = false;
  }

  sendOption() {
    if (!this.missed) {
      this.changeTitle();
      if (this.option.miss) {
        this._filterService.sendOption(this.option.miss, this.type);
        return;
      }
      this._filterService.sendOption(null, this.type);
    }
  }

  changeTitle() {
    this.title.emit(this.option.title);
  }
}
