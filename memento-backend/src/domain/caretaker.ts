import { AppService } from "src/app.service";
import { MementoDTO } from "src/dto/memento.dto";
import { MementoHistoryItemDTO } from "src/dto/mementoHistoryItem.dto";
import { ConcreteMemento } from "./concreteMemento";
import { Memento } from "./memento";
import { Originator } from "./originator";

export class Caretaker
{
    private _mementos: Memento[] = [];
    private _originator: Originator = null;

    constructor(originator: Originator)
    {
        this._originator = originator;
    }

    public async Backup(appService: AppService): Promise<number>
    {
        console.log("\nCaretaker: Saving Originator's state...");
        let memento = this._originator.save();
        let mementoDTO : MementoDTO =
        {
            content: memento.getContent(),
            date: memento.getDate(),
            title: memento.getTitle()
        };
        let result = await appService.saveMemento(mementoDTO);
        this._mementos.push(memento);

        return result;
    }

    public async Undo(id:number, appService: AppService): Promise<MementoHistoryItemDTO>
    {
        if (!this._mementos.length) {
           await this.GetHistory(appService);
        }

        if(!this._originator){
            let originatorBase = await appService.getLast();
            this._originator = new Originator(originatorBase.id, originatorBase.title, originatorBase.summary, originatorBase.date);

        }

        const memento = this._mementos.filter(x => x.getId().toString() === id.toString())[0];
        this._originator.restore(memento);
        return await appService.getMemento(id);
    }

    public async GetHistory(appService: AppService): Promise<MementoHistoryItemDTO[]>
    {
        let result = await appService.findAll()
        result.forEach(item => this._mementos.push(
            new ConcreteMemento(
            item.id,
            item.title,
            item.summary,
            item.date)));
        return result;
    }
}