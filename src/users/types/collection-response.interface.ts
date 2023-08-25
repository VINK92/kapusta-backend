export interface CollectionResponse<T> {
  meta?: {
    page: number;
    resourceCount: number;
  };
  data: T[];
}
