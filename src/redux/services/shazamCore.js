import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

//shazam API endpoint
// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '2d43a1a34emsh7583443828d95cep1b7784jsn7af0732d4238',
//       'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
//     }
//   };
  
//   fetch('https://shazam-core.p.rapidapi.com/v1/charts/world', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

    export const shazamCoreApi = createApi({
      //query for base of Shazam Core api
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
            prepareHeaders: (headers) => {
              headers.set('X-RapidAPI-Key', '2d43a1a34emsh7583443828d95cep1b7784jsn7af0732d4238');

              return headers;
            },
        }),
        //specific endpoint added to base query
        endpoints: (builder) => ({
          getTopCharts: builder.query({ query: () => '/charts/world' }),
          getSongDetails: builder.query({query: ({songid}) => `/tracks/details?track_id=${songid}`}),
          getSongRelated: builder.query({query: ({songid}) => `/tracks/related?track_id=${songid}`}),
          getArtistDetails: builder.query({ query: (artistId) => `/artists/details?artist_id=${artistId}` }),
        }),
    });

    //export endpoint as a hook
    export const {
      useGetTopChartsQuery,
      useGetSongDetailsQuery,
      useGetSongRelatedQuery,
      useGetArtistDetailsQuery,
    } = shazamCoreApi;