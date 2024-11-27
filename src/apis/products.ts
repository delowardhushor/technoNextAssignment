import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: (sort = 'asc') => `/products?sort=${sort}`,
    }),
    fetchProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductDetailsQuery } = productApi;
