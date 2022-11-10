import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Caretaker } from './domain/caretaker';
import { Originator } from './domain/originator';
import { MementoDTO } from './dto/memento.dto';
import { MementoHistoryItemDTO } from './dto/mementoHistoryItem.dto';

@Controller()
export class AppController {

  private _originator: Originator;
  private _careTaker: Caretaker;

  constructor(private readonly appService: AppService) {
    this._careTaker = new Caretaker(this._originator);
  }

  @Get('getMementoHistory')
  async getMementosHistory(): Promise<MementoHistoryItemDTO[]>{
    let result = await this._careTaker.GetHistory(this.appService);
    return result;
  }

  @Get('restoreMemento/:id')
  restoreMemento(@Param('id') id:number): Promise<MementoDTO>{
    this._careTaker = new Caretaker(this._originator);
    return this._careTaker.Undo(id, this.appService);
  }

  @ApiBody({description: "body:MementoDTO"})
  @Post('saveMemento')
  async saveMemento(@Body() memento: MementoDTO): Promise<number>{
    this._originator = new Originator(0, memento.title, memento.content, memento.date);
    this._careTaker = new Caretaker(this._originator);

    return await this._careTaker.Backup(this.appService);
  }
}
