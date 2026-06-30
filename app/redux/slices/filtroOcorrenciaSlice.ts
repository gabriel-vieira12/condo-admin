import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FiltroOcorrenciaState {
    gravidade: string;
    status: string;
}

const initialState: FiltroOcorrenciaState = {
    gravidade: "TODAS",
    status: "TODOS"
};

const filtroOcorrenciaSlice = createSlice({
    name: "filtroOcorrencia",
    initialState,
    reducers: {
        setFiltroGravidade: (state, action: PayloadAction<string>) => {
            state.gravidade = action.payload;
        },
        setFiltroStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        limparFiltros: (state) => {
            state.gravidade = "TODAS";
            state.status = "TODOS";
        }
    }
});

export const {
    setFiltroGravidade,
    setFiltroStatus,
    limparFiltros
} = filtroOcorrenciaSlice.actions;

export default filtroOcorrenciaSlice.reducer;