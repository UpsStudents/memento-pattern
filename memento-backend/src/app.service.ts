import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { MementoDTO } from './dto/memento.dto';
import { MementoHistoryItemDTO } from './dto/mementoHistoryItem.dto';
import { Memento } from './entities/memento';

@Injectable()
export class AppService {
  
  constructor(private manager: EntityManager, private dataSource: DataSource) {}

  async findAll():Promise<MementoHistoryItemDTO[]> {
    let response: MementoHistoryItemDTO[] = [];
    let results = await this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(Memento, 'memento')
      .take(20)
      .orderBy('memento.date', 'DESC')
      .getRawMany();
    
    Promise.all(
      results = results.map(async (result: Memento) => {
        response.push({
          id: result.id,
          date: result.date,
          summary: result.content,
          title: result.title
        });
      })
    );

    return response;

  }

  async saveMemento(memento:MementoDTO):Promise<number>{
    let response = 0;
    let result = await this.dataSource
    .createQueryBuilder()
    .insert()
    .into(Memento)
    .values([
      {
        date: memento.date,
        content: memento.content,
        title: memento.title
      }
    ])
    .execute();
    response = result.identifiers[0].id
    return response;
  }

  async getLast():Promise<MementoHistoryItemDTO>{
    let response: MementoHistoryItemDTO = {
      id: 0,
      date: null,
      summary: '',
      title: ''
    };
    let results = await this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(Memento, 'memento')
      .take(1)
      .orderBy('memento.date', 'DESC')
      .getRawMany();
    
    Promise.all(
      results = results.map(async (result: Memento) => {
        response.summary = result.content;
        response.date = result.date;
        response.title = result.title;
        response.id = result.id;
      })
    );

    return response;
  }

  async getMemento(id: number):Promise<MementoHistoryItemDTO>{
    let response: MementoHistoryItemDTO = {
      id: 0,
      date: null,
      summary: '',
      title: ''
    };
    let results = await this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(Memento, 'memento')
      .where("memento.id=:mementoId", {mementoId: id})
      .take(1)
      .getRawMany();
    
    Promise.all(
      results = results.map(async (result: Memento) => {
        response.id = result.id;
        response.summary = result.content;
        response.date = result.date;
        response.title = result.title;
      })
    );

    return response;
  }
}
