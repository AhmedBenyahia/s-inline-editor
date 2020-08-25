import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {Component, ContentChild, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {ViewModeDirective} from './view-mode.directive';
import {EditModeDirective} from './edit-mode.directive';
import {fromEvent, Subject} from 'rxjs';
import {filter, switchMapTo, take} from 'rxjs/operators';

@UntilDestroy({checkProperties: true})

@Component({
    selector: 's-inline-editor',
    template: `
        <ng-container *ngTemplateOutlet="currentView"></ng-container>
    `
})
export class SInlineEditorComponent implements OnInit {

    @Output() update = new EventEmitter();
    @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
    @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

    editMode = new Subject();
    editMode$ = this.editMode.asObservable();
    mode: 'view' | 'edit' = 'view';

    constructor(private host: ElementRef) {
    }

    get currentView(): any {
        return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
    }

    ngOnInit(): void {
        this.viewModeHandler();
        this.editModeHandler();
    }

    private get element(): any {
        return this.host.nativeElement;
    }

    private viewModeHandler(): any {
        fromEvent(this.element, 'dblclick').pipe(
            untilDestroyed(this)
        ).subscribe(() => {
            this.mode = 'edit';
            this.editMode.next(true);
        });
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
            this.update.next();
            this.mode = 'view';
        });
    }

}
