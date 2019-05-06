import { Injectable} from '@angular/core';
import { Client } from 'elasticsearch-browser';

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
  private queryalldocs = {
    'query': {
      'match_all': {}
    }
  };
  private connect() {
    let bonsai_url = process.env.BONSAI_URL;
    console.log(bonsai_url);
    this.client = new Client({
      host: bonsai_url,
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello there !'
    });
  }
  addToIndex(value): any {
    return this.client.create(value);
  }

  getAllDocuments(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: this.queryalldocs,
      filterPath: ['hits.hits._source']
    });
  }
}
