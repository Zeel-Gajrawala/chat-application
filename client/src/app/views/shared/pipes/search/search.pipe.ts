import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash/fp';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(searchArr: Array<any>, searchText: any): Array<any> {
    // if (!searchArr) return null;
    // if (!searchText) return searchText;

    // searchText = searchText.toLowerCase();
    // return searchArr.filter((item: User) => {
    //   return item[name].toLowerCase().includes(searchText);
    // })

    if (searchText) {
      let newSearchTerm = !isNaN(searchText) ? searchText.toString() : searchText.toString().toUpperCase();
      return searchArr.filter(item => {
        return this.lookForNestedObject(item, newSearchTerm);
      })
    } else { return searchArr; }
  }

  lookForNestedObject(item: any, newSearchTerm: any) {
    let origItem = { ...item };
    let that = this;
    let count = 0;
    parseNestedObject(item);

    function parseNestedObject(item: any) {
      for (let key in item) {
        if (_.isPlainObject(item[key])) {
          if (origItem[key]) { delete origItem[key] }
          parseNestedObject(item[key]);
        } else if (Array.isArray(item[key])) {
          if (origItem[key]) { delete origItem[key] }
          parseNestedObject(item[key]);
        } else {
          count++;
          if (origItem[key]) { delete origItem[key] }
          origItem[key] = item[key];
        }
      }
    }

    return that.search(item, origItem, newSearchTerm);
  }

  search(item: any, origItem: any, newSearchTerm: any) {
    let filteredList = [];
    let prop = "";

    for (let key in origItem) {
      if (origItem[key]) {
        prop = isNaN(origItem[key]) ? origItem[key].toString().toUpperCase() : origItem[key].toString();
      }
      if (prop.indexOf(newSearchTerm) > -1) {
        filteredList.push(item);
        return filteredList;
      }
    }
    return '';
  }

}
