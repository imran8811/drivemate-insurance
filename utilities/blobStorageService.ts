
import { BlobDeleteResponse, BlobServiceClient, BlockBlobClient } from '@azure/storage-blob'
import { BlobContainerRequest, BlobFileRequest, BlobStorageRequest } from '../types/azure-storage'

export enum BlobType {
  File = 'File',
  Base64 = 'Base64',
}

class BlobStorageService {
  async uploadToBlobStorage(file: File | string, request: BlobFileRequest, blobType: string): Promise<void> {
    const blockBlobClient = this.getBlockBlobClient(request)

    if (blobType === BlobType.Base64) {
      await this.uploadBlobFromBase64Image(blockBlobClient, file as string)
    } else {
      await this.uploadFile(blockBlobClient, file as File)
    }
  }

  private getBlockBlobClient(request: BlobFileRequest) {
    const containerClient = this.getContainerClient(request)
    return containerClient.getBlockBlobClient(request.blobName)
  }

  private getContainerClient(request: BlobContainerRequest) {
    const blobServiceClient = this.buildClient(request)
    return blobServiceClient.getContainerClient(request.containerName)
  }

  private buildClient(options: BlobStorageRequest) {
    return BlobServiceClient.fromConnectionString(this.buildConnectionString(options))
  }

  private async uploadFile(blockBlobClient: BlockBlobClient, file: File) {
    const options = { blobHTTPHeaders: { blobContentType: file.type } }

    await blockBlobClient.uploadBrowserData(file, options)
  }

  async deleteFile(request: BlobFileRequest): Promise<BlobDeleteResponse> {
    const blockBlobClient = this.getBlockBlobClient(request)
    const reponse = await blockBlobClient.delete()
    return reponse
  }

  private async uploadBlobFromBase64Image(blockBlobClient: BlockBlobClient, fileBase64: string) {
    const matches: any = fileBase64.match(/^data:([+/A-Za-z-]+);base64,(.+)$/)
    const type = matches[1]
    const buffer = Buffer.from(matches[2], 'base64')

    const options = { blobHTTPHeaders: { blobContentType: type } }

    await blockBlobClient.upload(buffer, buffer.byteLength, options)
  }

  private buildConnectionString = (options: BlobStorageRequest) => {
    return `BlobEndpoint=${options.storageUri};SharedAccessSignature=${options.storageAccessToken}`
  }
}

export default BlobStorageService
