export default interface IBook {
  accessInfo: object
  etag: string
  id: string
  kind: string
  saleInfo: ISelfLink
  searchInfo: object
  selfLink: string
  quantity: number
  volumeInfo: {
    title: string,
    authors: string[],
    categories: string[]
  }
}

interface ISelfLink {
  listPrice: {
    amount: number
    currencyCode: string
  },
  saleability: string
}

export default interface IBooks {
  items: IBook[]
  kind:string
  totalItems:number
}