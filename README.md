# SaytoInlineEditor   

<img alt="npm" src="https://img.shields.io/npm/v/@slaysayto/s-inline-editor">

package page in npm: https://www.npmjs.com/package/@slaysayto/s-inline-editor

demo: https://stackblitz.com/edit/s-inline-editor?file=src/app/s-inline-editor.component.ts

This project use [Angular CLI version 10.0.7]

Thanks for Netanel Basal for his amazing article with help me create this project: https://netbasal.com/keeping-it-simple-implementing-edit-in-place-in-angular-4fd92c4dfc70

This project still in development and i am still learning how to create packages, inspire me with you idea and notes. 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Exemple of how to use: 
Here i am using the s-inline-editor with two ionic component, this demonstrate that we can customize the template as we wish. we can also use normal html element.

```html
<s-inline-editor (update)="handleUpdateEvent()"
                    [(mode)]="modeViewOrEdit">
                    <ng-template viewMode>{{valueHere}}</ng-template>
                    <ng-template editMode>
                      <ion-input class="custom-input-class"
                               name="inputName"
                               [(ngModel)]="inputVal">
                                <ion-icon class="ml-2"
                                name="iconName"
                                (click)="closeInlineEditor()"></ion-icon>
                      </ion-input>
                    </ng-template>
    </s-inline-editor>
    
```

The closeInlineEditor is very simple here is an exemple:

```javascript
closeInlineEditor () {
  this.modeViewOrEdit = 'view';
}
```

Note that the mode attribute has a default value and can be ignored if we don't need it.

```html

<s-inline-editor (update)="updateField()">
        <ng-template viewMode>{{entity.name}}</ng-template>
        <ng-template editMode>
          <input [formControl]="inputControle">
        </ng-template>
</s-inline-editor>
```

    
    
