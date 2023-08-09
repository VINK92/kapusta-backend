import { CollectionResponse } from 'src/users/types/collection-response.interface';

export const buildCollectionResponse = <T>(
  items: Array<T>,
  itemsCount: number,
): CollectionResponse<T> => {
  const pageCount =
    itemsCount % 10 === 0 ? itemsCount / 10 : +(itemsCount / 10).toFixed(0) + 1;
  return {
    data: items,
    meta: {
      pageCount,
      resourceCount: itemsCount,
    },
  };
};
