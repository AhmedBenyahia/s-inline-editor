import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ViewModeDirective} from './view-mode.directive';
import {EditModeDirective} from './edit-mode.directive';
import {fromEvent, Subject} from 'rxjs';
import {filter, switchMapTo, take} from 'rxjs/operators';
import {Platform} from '@ionic/angular';

@UntilDestroy({checkProperties: true})

@Component({
  selector: 's-inline-editor',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `
})
export class SInlineEditorComponent implements OnInit {


  @Output() update = new EventEmitter();
  @Input() set mode(value: 'view' | 'edit') {
    this.update.next();
    this._mode = value;
    this.modeChange.emit(this._mode);
  }
  @Output() modeChange = new EventEmitter();

  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

  private _mode: 'view' | 'edit' = 'view';
  editMode = new Subject();
  editMode$ = this.editMode.asObservable();
  private touchtime = 0;

  constructor(private host: ElementRef, public platform: Platform) {
  }

  get currentView(): any {
    return this._mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private get element(): any {
    return this.host.nativeElement;
  }

  private viewModeHandler(): any {
    // console.log("platform: " + this.platform.platforms());
    if (this.platform.is('desktop')) {
      fromEvent(this.element, 'dblclick').pipe(
        untilDestroyed(this)
      ).subscribe(() => {
        this._mode = 'edit';
        this.modeChange.emit(this._mode);
        this.editMode.next(true);
      });
    }
  }

  @HostListener('click') onclick(): void {
    if (this.touchtime === 0) {
      this.touchtime = new Date().getTime();
    } else {
      if (new Date().getTime() - this.touchtime < 400) {
        this._mode = 'edit';
        this.modeChange.emit(this._mode);
        this.editMode.next(true);
        this.touchtime = 0;
      } else {
        this.touchtime = new Date().getTime();
      }
    }
  }

  @HostListener('keyup.enter') submit(): void {
    this.update.next();
    this._mode = 'view';
    this.modeChange.emit(this._mode);
  }

  private editModeHandler(): void {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({target}) => this.element.contains(target) === false),
      take(1)
    );

    this.editMode$.pipe(
      switchMapTo(clickOutside$),
      untilDestroyed(this)
    ).subscribe(event => {
      console.log('go back to view mode');
      this.update.next();
      this._mode = 'view';
      this.modeChange.emit(this._mode);
    });
  }

}
