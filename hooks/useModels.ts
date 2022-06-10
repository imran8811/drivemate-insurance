import useSWR from 'swr'
import { GET_BRAND_MODELS } from '../utilities/endpoints'

export type Model = {
  data : {
    model : [
      {
        id: number,
        name: string,
        logo: string,
        logo_size: {
          width: number,
          height: number
        },
        is_popular: boolean
      }
    ]
  }
}

const useModel = (brandId: string): {
  data?: Model
  error?: any
  isLoading: boolean
} => {

  const fetcher = url => fetch(url).then(r => r.json())

  const { data, error } = useSWR(`${GET_BRAND_MODELS}/${brandId}`, fetcher)

  return {
    data,
    error,
    isLoading: !error && !data
  }
}

export default useModel;
