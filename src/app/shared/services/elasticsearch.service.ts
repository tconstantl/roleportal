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
    'from': 0,
    'size': 10000,
    'query': {
      'match_all': {}
    }
  };
  private connect() {
    // let bonsai_url = process.env.BONSAI_MAUVE_URL;
    // console.log(bonsai_url);
    this.client = new Client({
      host: 'https://t94rq2x4vr:kpq8iym6c4@yew-925371879.eu-west-1.bonsaisearch.net',
    });
  }

  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello there !'
    });
  }
  // addToIndex(value): any {
  //   return this.client.create(value);
  // }
  addToIndex(index, value): any {
    return this.client.index({
      index: index,
      type: '_doc',
      body: value
    });
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
