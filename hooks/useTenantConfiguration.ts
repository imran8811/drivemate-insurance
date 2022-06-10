import useSWR from 'swr'
import getConfig from 'next/config'
import { Secrets, TenantConfig } from './typings'

const { publicRuntimeConfig } = getConfig() as { publicRuntimeConfig: { tenantId: string } }
const TENANT_ID = 'drivemate'
const endpoint = '/tenant-management/configs'
const getTenantConfigurationEndpoint = `${endpoint}/getConfig/${TENANT_ID}`
const getSecretsEndpoint = `${endpoint}/getSecrets/APPINSIGHTS_INSTRUMENTATIONKEY,STORAGE_ACCOUNT_URL`
export const getDocumentUploadUrlsEndpoint = `${endpoint}/getUploadUrls/${TENANT_ID}`

export const useTenantConfiguration = (): {
  data?: TenantConfig
  error?: Error
  isLoading: boolean
} => {
  const { error, data } = useSWR<TenantConfig, Error>(getTenantConfigurationEndpoint, undefined, {
    revalidateOnFocus: false,
  })

  return {
    data,
    error,
    isLoading: !error && !data,
  }
}

export const useSecrets = (): {
  data?: Secrets
  error?: Error
  isLoading: boolean
} => {
  const { error, data } = useSWR<Secrets, Error>(getSecretsEndpoint)

  return {
    data,
    error,
    isLoading: !error && !data,
  }
}
