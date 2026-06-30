'use client'

import { Ocorrencia } from "../types/ocorrencia";
import api from "./api";

export async function buscarListaOcorrencias(): Promise<Ocorrencia[]> {

    const dados = await api.get<Ocorrencia[]>('http://localhost:8080/ocorrencias');

    if (dados.status == 200) {
        return dados.data;
    }

    return [];
}

export async function atualizarOcorrencia(ocorrenciaExistente: Ocorrencia): Promise<number> {

    var dadosResult = await api.put<number>(
        'http://localhost:8080/ocorrencias/' + ocorrenciaExistente.id,
        ocorrenciaExistente
    );

    return dadosResult.data;
}

export async function salvarOcorrencia(ocorrencia: Ocorrencia): Promise<number> {

    var dadosResult = await api.post<number>(
        'http://localhost:8080/ocorrencias',
        ocorrencia
    );

    return dadosResult.data;
}

export async function buscarOcorrenciaPorId(codigo: number): Promise<Ocorrencia> {

    return (
        await api.get<Ocorrencia>('http://localhost:8080/ocorrencias/' + codigo)
    ).data;
}