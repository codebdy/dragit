import { makeAutoObservable } from "mobx";


export class PaginatorInfo {
  count: number = 0;
  currentPage: number = 0;
  hasMorePages: boolean = false;
  lastPage: number = 0;
  perPage: number = 0;
  total: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setQueryResult(data: any = {}) {
    const {
      count = 0,
      currentPage = 0,
      hasMorePages = false,
      lastPage = 0,
      perPage = this.perPage,
      total = 0
    } = data;

    this.count = count;
    this.currentPage = currentPage;
    this.hasMorePages = hasMorePages;
    this.lastPage = lastPage;
    this.perPage = perPage;
    this.total = total;
  }

  setPerPage(perPage: number) {
    this.perPage = perPage;
  }

  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage;
  }
}
