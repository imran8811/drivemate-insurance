import useSWR from 'swr'
import { GET_INSURANCE_SUMMARY } from '../utilities/endpoints'

const useInsurance = (id:string,session:string): {
  data?: any
  error?: any
  isLoading: boolean
} => {

    const fetcher = async url => {
        const resp = await fetch(url, {
          headers: {
            Authorization: 'Bearer ' + session,
          },
        })
        if(!resp.ok){
          throw resp.status
        }
        return await resp.json()
      }

  const { data, error } = useSWR(session?`${GET_INSURANCE_SUMMARY}?_id=${id}`:null, fetcher,{refreshInterval:5000})
  return {
    data:data?.pageData?.[0],
    error,
    isLoading: !error && !data
  }
}

export default useInsurance