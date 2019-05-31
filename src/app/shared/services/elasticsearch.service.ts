import { Injectable} from '@angular/core';
import { Client } from 'elasticsearch-browser';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElasticsearchService {
  private client: Client;
  constructor() {
    if (!this.client) {
      this.connect();
    }
  }

  private connect() {
    // let bonsai_url = process.env.BONSAI_URL;
    // console.log(bonsai_url);
    this.client = new Client({
      host:environment.bonsaiUrl,
    });
  }

  addToIndex(index, value): any {
    return this.client.index({
      index: index,
      type: '_doc',
      body: value
    });
  }

  updateDocument(index, value, id): any {
    return this.client.update({
      index: index,
      type: '_doc',
      body: {
        "doc" : value
      },
      id: id
    });
  }

  getAllDocuments(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: { 'query': {  'match_all': {}} },
      size: 10000,
      filterPath: ['hits.hits._source']
    });
  }

  searchDocuments(_index, _type, _body): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: _body,
      size: 10000,
      filterPath: ['hits.hits._source']
    });
  }


  getDocument(_index, _type, _id): any {
    return this.client.get({
      index: _index,
      type: _type,
      id: _id
    });
  }
}
