import { makeAutoObservable } from "mobx";
import { Paginator } from "../../Data/Paginator";


export class PaginatorInfo {
  count: number = 0;
  pageIndex: number = 0;
  pageSize: number = 0;
  totalCount: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setQueryResult(pagination?: Paginator, count?:number) {
    const {
      pageIndex = 0,
      totalCount = 0
    } = pagination||{};

    this.count = count||0;
    this.pageIndex = pageIndex;
    this.totalCount = totalCount;
  }

  setPerPage(perPage: number) {
    this.pageSize = perPage;
  }

  setCurrentPage(currentPage: number) {
    this.pageIndex = currentPage;
  }
}
