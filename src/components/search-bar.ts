import algoliasearch from "algoliasearch/lite";
import { bindable, ICustomElementViewModel } from "aurelia";

import _ from "lodash";

import config from "../../algolia.config.json";

const client = algoliasearch(config.appId, config.searchKey);
const index = client.initIndex(config.indice);

export class SearchBar implements ICustomElementViewModel {
  @bindable private hits;

  private query: string;

  async binding(): Promise<void> {
    await index.search("").then(({ hits }) => {
      this.hits = _.chain(hits).orderBy("title").groupBy("category").value();
    });
  }

  async handleInputChange(): Promise<void> {
    await index.search(this.query).then(({ hits }) => {
      this.hits = _.chain(hits).orderBy("title").groupBy("category").value();
    });
  }
}
