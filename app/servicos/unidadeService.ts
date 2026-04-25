
import { Unidade } from "../types/unidade";
import api from "./api";


export async function buscarListaUsuarios(): Promise<Unidade[]> {
    const dados = await api.get<Unidade[]>('/unidades');
    if(dados.status == 200){
        return dados.data;
    }


    return[];
}