import { CollectionResponse } from 'src/users/types/collection-response.interface';

export const buildCollectionResponse = <T>(
  items: Array<T>,
  itemsCount: number,
  page?: number,
): CollectionResponse<T> => {
  return {
    data: items,
    meta: {
      page: page || 0,
      resourceCount: itemsCount,
    },
  };
};
