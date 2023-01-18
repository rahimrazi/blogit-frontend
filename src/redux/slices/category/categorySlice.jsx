import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

//action to redirect
const resetEditAction = createAction("category/reset")
const resetDeleteAction = createAction("category/delete-reset")

//action
export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get the user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/category`,
        {
          title: category?.title,
        },
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//action for fetching all categories
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get the user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/category`,
        
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//action for updating categories
export const updateCategoriesAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
    //get the user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/category/${category?.id}`,
        {title:category?.title},
        
        
        config
      );
      //dispatch action to reset the updated data inorder to redirect properly
      dispatch(resetEditAction())
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//delete category

export const deleteCategoriesAction = createAsyncThunk(
  "category/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get the user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.delete(
        `${baseUrl}/api/category/${id}`,
        
        
        config
      );
      // dispatch action for redirect after deleting
      dispatch(resetDeleteAction())
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch details of a single category

export const fetchCategoryAction = createAsyncThunk(
  "category/details",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get the user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    //http call
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/category/${id}`,
        
        
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
//slices
const categorySlices = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    //create category (reducers)
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all categories
    builder.addCase(fetchCategoriesAction.pending,(state,action)=>{
      state.loading = true;

    })
    builder.addCase(fetchCategoriesAction.fulfilled,(state,action)=>{
      state.categoryList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(fetchCategoriesAction.rejected,(state,action)=>{
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })
    //update category
    builder.addCase(updateCategoriesAction.pending,(state,action)=>{
      state.loading = true;

    })
    //dispatch action 
    builder.addCase(resetEditAction,(state,action)=>{
      state.isEdited = true
    })
    builder.addCase(updateCategoriesAction.fulfilled,(state,action)=>{
      state.updateCategory = action?.payload;
      state.isEdited = false
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(updateCategoriesAction.rejected,(state,action)=>{
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })
    //delete category
    builder.addCase(deleteCategoriesAction.pending,(state,action)=>{
      state.loading = true;

    })
        //dispatching for redirect
    builder.addCase(resetDeleteAction,(state,action)=>{
      state.isDeleted= true
    })
    builder.addCase(deleteCategoriesAction.fulfilled,(state,action)=>{
      state.deletedCategory = action?.payload;
      state.isDeleted= false;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(deleteCategoriesAction.rejected,(state,action)=>{
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })
    //fetch category details
    builder.addCase(fetchCategoryAction.pending,(state,action)=>{
      state.loading = true;

    })
    builder.addCase(fetchCategoryAction.fulfilled,(state,action)=>{
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    })
    builder.addCase(fetchCategoryAction.rejected,(state,action)=>{
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    })
  },
});

export default categorySlices.reducer;
