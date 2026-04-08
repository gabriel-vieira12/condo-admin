import axios from "axios";
import { Morador } from "@/app/context/AuthContext";

const API_URL = "http://localhost:8080/moradores";

export class MoradorService {
  static async listarTodos(): Promise<Morador[]> {
    const response = await axios.get<Morador[]>(API_URL);
    return response.data;
  }

  static async buscarPorId(id: number): Promise<Morador> {
    const response = await axios.get<Morador>(`${API_URL}/${id}`);
    return response.data;
  }

  static async salvar(morador: Morador): Promise<number> {
    const response = await axios.post<number>(API_URL, morador);
    return response.data;
  }

  static async atualizar(id: number, morador: Morador): Promise<string> {
    const response = await axios.put<string>(`${API_URL}/${id}`, morador);
    return response.data;
  }
}