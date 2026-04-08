import axios from "axios";
import { Unidade } from "@/app/context/AuthContext";

const API_URL = "http://localhost:8080/unidades";

export class UnidadeService {
  static async listarTodos(): Promise<Unidade[]> {
    const response = await axios.get<Unidade[]>(API_URL);
    return response.data;
  }

  static async buscarPorId(id: number): Promise<Unidade> {
    const response = await axios.get<Unidade>(`${API_URL}/${id}`);
    return response.data;
  }

  static async salvar(unidade: Unidade): Promise<number> {
    const response = await axios.post<number>(API_URL, unidade);
    return response.data;
  }

  static async atualizar(id: number, unidade: Unidade): Promise<string> {
    const response = await axios.put<string>(`${API_URL}/${id}`, unidade);
    return response.data;
  }
}