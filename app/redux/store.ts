import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import filtroOcorrenciaReducer from "./slices/filtroOcorrenciaSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filtroOcorrencia: filtroOcorrenciaReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;