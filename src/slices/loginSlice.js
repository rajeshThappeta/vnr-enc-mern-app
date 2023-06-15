import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';



//make HTTP POSR req for user login
export let userLogin=createAsyncThunk('login',async(userCredObj,thunkApi)=>{
        let res=await axios.post('http://localhost:4000/user-api/user-login',userCredObj)
        console.log("res is ",res)
        if(res.data.message==='login success'){

            //store token in local/session storage
            localStorage.setItem('token',res.data.token)
            
            return res.data;
        }
        else{
            return thunkApi.rejectWithValue(res.data)
        }
})

const loginSlice=createSlice({
    name:'login',
    initialState:{
        currentUser:{},
        userLoginStatus:false,
        isPending:false,
        errorMessage:''
    },
    reducers:{
        clearState:(state,action)=>{
            state.currentUser={};
            state.userLoginStatus=false;
            state.isPending=false;
            state.errorMessage=''
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userLogin.pending,(state,action)=>{
           state.isPending=true;
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            console.log("action in fulfilled",action)
            state.currentUser=action.payload.currentUser;
            state.userLoginStatus=true;
            state.isPending=false;
            state.errorMessage=''
        })
        .addCase(userLogin.rejected,(state,action)=>{
            console.log("action in rejected",action)
            state.errorMessage=action.payload.message;
            state.currentUser={};
            state.isPending=false;
            state.userLoginStatus=false;
        })
    }
})


//export action creator functions
export const {clearState}=loginSlice.actions;
//export reducer of this slice
export default loginSlice.reducer;





