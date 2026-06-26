'use client'

import { Morador } from "../types/morador";
import api from "./api";

export async function buscarListaMoradores(): Promise<Morador[]> {

    const dados = await api.get<Morador[]>('http://localhost:8080/moradores');

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function atualizarMorador(moradorExistente: Morador): Promise<number> {

    var dadosResult = await api.put<number>(
        'http://localhost:8080/moradores/' + moradorExistente.id,
        moradorExistente
    );

    return dadosResult.data;
}

export async function salvarMorador(morador: Morador): Promise<number> {

    var dadosResult = await api.post<number>(
        'http://localhost:8080/moradores',
        morador
    );

    return dadosResult.data;
}

export async function buscarMoradorPorId(codigo: number): Promise<Morador> {

    return (
        await api.get<Morador>('http://localhost:8080/moradores/' + codigo)
    ).data;
}