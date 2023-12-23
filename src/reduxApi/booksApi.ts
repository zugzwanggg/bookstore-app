import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const key:string = 'AIzaSyCy_pHKENNXDxhZvSScy3cjf5D5tM7Ku8g'


export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({baseUrl:`https://www.googleapis.com/books/v1/volumes`}),
  endpoints: (builder)=> ({
    getBook: builder.query({
      query: (text) => `?q=${text}&${key}&maxResults=20`
    }),
    getBookById: builder.query({
      query: (id) => `${id}?${key}`
    }),
  }),
})

export const {useGetBookQuery,useGetBookByIdQuery} = booksApi