import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../../utils/baseURL";


//register action

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    
      
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      //http call
      try {
      const {data} = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
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
//login
export const loginUserAction = createAsyncThunk(
  "users/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    
      
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        //http call 
        const {data} = await axios.post(
          `${baseUrl}/api/users/login`,
          userData,
          config
        );
        //save user into local storage because we need to save token
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
        
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
        

        
      }
    })

  //profile (for user profile )
export const userProfileAction = createAsyncThunk(
  "user/profile",
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
        `${baseUrl}/api/users/profile/${id}`,
        
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

//update profile action

export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
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
      const {data} = await axios.put(
        `${baseUrl}/api/users`,
        {lastName: userData?.lastName,
          firstName:userData?.firstName,
          bio: userData?.bio,
          email:userData?.email
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
//fetch user detail action

export const fetchUserDetailAction = createAsyncThunk(
  "user/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
     
      //http call
      try {
      const {data} = await axios.get(
        `${baseUrl}/api/users/${id}`,
        
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
// Logout action

  export const logoutAction = createAsyncThunk(
    '/user/logout',
    async(payload,{rejectWithValue,getState,dispatch})=>{
      try {
        localStorage.removeItem("userInfo")
      } catch (error) {
        if(!error?.respone){
          throw error;

        }
        return rejectWithValue(error?.respone?.data)
        
      }
    }
  )

  // upload profile pic photo 
export const uploadProfilePhotoAction = createAsyncThunk(
  "user/profile-photo",
  async (userImg, { rejectWithValue, getState, dispatch }) => {
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
        
        formData.append('image',userImg?.image)
        const {data}= await axios.put(`${baseUrl}/api/users/profilephoto-upload`,formData,config)
        
        return data;
    } catch (error) {
        if(!error?.response) throw error;
        return rejectWithValue(error?.response?.data)
    }
  }
);

//get user from local storage and place it into store
const userLoginFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null;

//slices

const usersSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage
  },
  extraReducers: builder=> {
    //register
    builder.addCase(registerUserAction.pending, (state,action)=> {
        state.loading = true
        state.appErr = undefined
        state.serverErr= undefined
    
  });
  builder.addCase(registerUserAction.fulfilled, (state,action)=> {
    state.loading = false;
    state.registered = action?.payload
    state.appErr = undefined
    state.serverErr= undefined
  });
  builder.addCase(registerUserAction.rejected, (state,action)=> {
    
    state.loading = false;
    state.appErr = action?.payload?.message
    state.serverErr= action?.error?.message
  });

  //login
  builder.addCase(loginUserAction.pending, (state,action)=> {
    state.loading = true
    state.appErr = undefined
    state.serverErr= undefined
    
  });
  builder.addCase(loginUserAction.fulfilled, (state,action)=> {
    state.userAuth  = action?.payload;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr= undefined
  });
  builder.addCase(loginUserAction.rejected, (state,action)=> {
    state.loading = false;
    state.appErr = action?.payload?.message
    state.serverErr = action?.error?.message
  });

  //profile
  builder.addCase(userProfileAction.pending, (state,action)=> {
    state.loading = true
    state.appErr = undefined
    state.serverErr= undefined
    
  });
  builder.addCase(userProfileAction.fulfilled, (state,action)=> {
    state.profile  = action?.payload;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr= undefined
  });
  builder.addCase(userProfileAction.rejected, (state,action)=> {
    state.loading = false;
    state.appErr = action?.payload?.message
    state.serverErr = action?.error?.message
  });

  //fetching single user profile action
  builder.addCase(fetchUserDetailAction.pending, (state,action)=> {
    state.loading = true
    state.appErr = undefined
    state.serverErr= undefined

});
builder.addCase(fetchUserDetailAction.fulfilled, (state,action)=> {
state.loading = false;
state.userDetails = action?.payload
state.appErr = undefined
state.serverErr= undefined
});
builder.addCase(fetchUserDetailAction.rejected, (state,action)=> {

state.loading = false;
state.appErr = action?.payload?.message
state.serverErr= action?.error?.message
});


  //logout
  builder.addCase(logoutAction.pending,(state,action)=>{
    state.loading = false;
  })
  builder.addCase(logoutAction.fulfilled,(state,action)=>{
    state.userAuth = undefined;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr = undefined;
  })
  builder.addCase(logoutAction.rejected,(state,action)=>{
    state.appErr = action?.payload?.message;
    state.serverErr = action?.error?.message;
    state.loading = false
  })

  //update profile 
  builder.addCase(updateUserAction.pending, (state,action)=> {
    state.loading = true
    state.appErr = undefined
    state.serverErr= undefined

});
builder.addCase(updateUserAction.fulfilled, (state,action)=> {
state.loading = false;
state.userUpdated = action?.payload
state.appErr = undefined
state.serverErr= undefined
});
builder.addCase(updateUserAction.rejected, (state,action)=> {

state.loading = false;
state.appErr = action?.payload?.message
state.serverErr= action?.error?.message
});

  //upload profile pic
  builder.addCase(uploadProfilePhotoAction.pending, (state,action)=> {
    state.loading = true
    state.appErr = undefined
    state.serverErr= undefined
    
  });
  builder.addCase(uploadProfilePhotoAction.fulfilled, (state,action)=> {
    state.profilePhoto  = action?.payload;
    state.loading = false;
    state.appErr = undefined;
    state.serverErr= undefined
  });
  builder.addCase(uploadProfilePhotoAction.rejected, (state,action)=> {
    state.loading = false;
    state.appErr = action?.payload?.message
    state.serverErr = action?.error?.message
  });

  },
  })
  


export default usersSlices.reducer;