'use client'
import { Unidade } from "../types/unidade";
import api from "./api";

export async function buscarListaUnidades(): Promise<Unidade[]> {

    const dados = await api.get<Unidade[]>('http://localhost:8080/unidades');

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function atualizarUnidade(unidadeExistente: Unidade): Promise<number> {

    var dadosResult = await api.put<number>(
        'http://localhost:8080/unidades/' + unidadeExistente.id, unidadeExistente
    );

    return dadosResult.data;
}

export async function salvarUnidade(unidade: Unidade): Promise<number> {

    var dadosResult = await api.post<number>(
        'http://localhost:8080/unidades', unidade
    );

    return dadosResult.data;
}

export async function buscarUnidadePorId(codigo: number): Promise<Unidade> {

    return (
        await api.get<Unidade>('http://localhost:8080/unidades/' + codigo)
    ).data;
}