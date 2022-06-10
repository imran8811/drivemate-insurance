import useSWR from 'swr'
import { GET_BRANDS } from '../utilities/endpoints'

import { IBrand } from '../interfaces/IBrand';

const useBrands = (brandName): {
  data?: IBrand
  error?: any
  isLoading: boolean
} => {

  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`${GET_BRANDS}?brand_name=${brandName}`, fetcher)

  return {
    data,
    error,
    isLoading: !error && !data
  }
}

export default useBrands
