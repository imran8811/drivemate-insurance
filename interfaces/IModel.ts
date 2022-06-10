export interface IModel {
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