export interface PaginationMeta {
  page: number;
  totalCount: number;
  totalPages: number;
}

export class PaginationMetaConstructor {
  public paginationMeta: PaginationMeta = {
    page: 0,
    totalCount: 0,
    totalPages: 0,
  };

  constructor(data: any) {
    try {
      this.paginationMeta.page = data.page;
      this.paginationMeta.totalCount = data.totalCount;
      this.paginationMeta.totalPages = data.totalPages;
    } catch (e) {
      console.log(e);
    }
  }

  getField() {
    return this.paginationMeta;
  }
}
