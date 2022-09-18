import {createSlice} from '@reduxjs/toolkit';

export const products = createSlice({
  name: 'products',
  initialState: {
    current_page: 0,
    data: [],
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0,
  },

  reducers: {
    addProducts(state, {payload}) {
      /*    const json = (JSON.stringify(...payload))
                const obj = JSON.parse(json)
                const id = (obj.category_id)
                console.log(id)*/

      state.data = [...payload.data];
      state.current_page = payload.current_page;
      state.next_page_url = payload.next_page_url;
    },
    loadMoreProduct(state, {payload}) {
      // console.log(payload);
      state.data = [...state.data, ...payload.data];
      state.current_page = payload.current_page;
      state.next_page_url = payload.next_page_url;
    },
  },
});

export const {addProducts, loadMoreProduct} = products.actions;

export default products.reducer;
