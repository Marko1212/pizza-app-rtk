import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios from 'axios';
import { LoginResponse } from '../interfaces/auth.interface';
import { PREFIX } from '../helpers/API';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersistentState {
	jwt: string | null;
}

export interface UserState {
	jwt: string | null;
}

const initialState: UserState = {
	jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk(
	'user/login',
	async (params: { email: string; password: string }) => {
		const { data } = await axios.post<LoginResponse>(`${PREFIX}/login`, {
			email: params.email,
			password: params.password
		});
		return data;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.jwt = null;
		}
	},
	extraReducers(builder) {
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<LoginResponse>) => {
				state.jwt = action.payload.accessToken;
			}
		);
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
