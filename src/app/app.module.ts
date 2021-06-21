import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ViewModeDirective} from './s-inline-editor/view-mode.directive';
import {EditModeDirective} from './s-inline-editor/edit-mode.directive';
import {SInlineEditorComponent} from './s-inline-editor/s-inline-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewModeDirective,
    EditModeDirective,
    SInlineEditorComponent,
  ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
