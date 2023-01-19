import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";

//create post action
            //actions to redirect after creating posts
const resetPost = createAction("category/reset")

export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    //get the user token
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
        //http call
        const formData = new FormData()
        formData.append('title',post?.title)
        formData.append('description',post?.description)
        formData.append('category',post?.category)// formData.append('category',post?.category?.label)
        formData.append('image',post?.image)
        const {data}= await axios.post(`${baseUrl}/api/posts`,formData,config)
        //dispatch action
        dispatch(resetPost())
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data)
    }
  }
);
//fetch all posts for listing
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    
    try {
        //http call
       
        const {data}= await axios.get(`${baseUrl}/api/posts?category=${category}`)
        //dispatch action
        
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data)
    }
  }
);
// slice

const postSlice = createSlice({
    name:'post',
    initialState:{},
    extraReducers:(builder)=>{
      //create post
        builder.addCase(createpostAction.pending,(state,action)=>{
            state.loading = true;
        });
        //redirection
        builder.addCase(resetPost,(state,action)=>{
            state.isCreated = true;

        })
        builder.addCase(createpostAction.fulfilled,(state,action)=>{
            state.postCreated = action?.payload;
            state.loading = false;
            state.isCreated = false
            state.appErr = undefined;
            state.serverErr = undefined
        })
        builder.addCase(createpostAction.rejected,(state,action)=>{
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverErr = action?.payload?.message
        })
        //fetch all posts
        //create post
        builder.addCase(fetchPostsAction.pending,(state,action)=>{
          state.loading = true;
      });
     

      
      builder.addCase(fetchPostsAction.fulfilled,(state,action)=>{
          state.postLists = action?.payload;
          state.loading = false;
          
          state.appErr = undefined;
          state.serverErr = undefined
      })
      builder.addCase(fetchPostsAction.rejected,(state,action)=>{
          state.loading = false;
          state.appErr = action?.payload?.message;
          state.serverErr = action?.payload?.message
      })

    }
})

export default postSlice.reducer