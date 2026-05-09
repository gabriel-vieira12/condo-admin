import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    itens: []
}

const authSlice = createSlice(
    {
        name: 'carrinho',
        initialState,
        reducers:{
            addCarrinho: (state, action: PayloadAction<{item: string}>) => {
                
     

            },
            removerCarrinho: (state, action: PayloadAction<{item: string}>) => {


            }
        }
    }
);

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;