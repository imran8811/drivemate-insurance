import useSWR from 'swr'
import { GET_BRANDS } from '../utilities/endpoints'

import { IBrand } from '../interfaces/IBrand';

const useBrands = (): {
  data?: IBrand
  error?: any
  isLoading: boolean
} => {

  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`${GET_BRANDS}`, fetcher)

  return {
    data,
    error,
    isLoading: !error && !data
  }
}

export default useBrands
