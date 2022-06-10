export interface IBrand {
  data : {
    brand : [
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