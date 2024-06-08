import { ProductListConfig } from 'src/types/product.type'
import useQueryParams from './useQueryParams'
// Looại bỏ bớt thành phần theo điều kiện
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  // filter url
  const queryConfig: QueryConfig = omitBy(
    {
      // Page ko co thi mac dinh laf 1
      page: queryParams.page || '1',
      limit: queryParams.limit || '15',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )
  return queryConfig
}
