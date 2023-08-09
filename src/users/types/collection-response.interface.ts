export interface CollectionResponse<T> {
  meta?: {
    pageCount: number;
    resourceCount: number;
  };
  data: T[];
}
