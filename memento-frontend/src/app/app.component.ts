import { Component } from '@angular/core';
import { Memento, MementoHistoryItem } from './memento.dto';
import { MementoService } from './memento.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'memento-frontend';
  history: MementoHistoryItem[] = [];
  currentHistoryItemId = 0;

  editorForm = new FormGroup({
    date: new FormControl(new Date()),
    title: new FormControl('Título del documento'),
    content: new FormControl('Contenido del documento')
  });

  constructor(private _mementoService: MementoService){
    this.initialize();
  }

  private initialize(){
    this._mementoService.getMementosHistory().subscribe( response => 
      {
        this.history = response;
        if(this.history.length > 0){ this.currentHistoryItemId = this.history[0].id;}
      }
    );
  }

  public clickOnHistoryItem(id: number){
      this.setCurrentHistoryItem(id);
  }

  private setCurrentHistoryItem(id: number){
    this.currentHistoryItemId = id;
  }

  public restoreMemento(){
    this._mementoService.restoreMemento(this.currentHistoryItemId).subscribe(
      response => {
        this.editorForm.patchValue({
          title: response.title,
          content: response.content,
          date: response.date
        });
      }
    )
  }

  public saveMemento(){

    this.editorForm.patchValue({
      date: new Date()
    });

    let request: Memento = {
      title: this.editorForm.controls.title.value ?? '',
      content: this.editorForm.controls.content.value ?? '',
      date: this.editorForm.controls.date.value ?? new Date()
    };
    this._mementoService.saveMemento(request).subscribe(
      response => { debugger; if(response){ this.initialize(); } }
    )
  }
}
