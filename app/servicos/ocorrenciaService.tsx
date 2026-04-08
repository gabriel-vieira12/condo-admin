import axios from "axios";
import { Ocorrencia } from "@/app/context/AuthContext";

const API_URL = "http://localhost:8080/ocorrencias";

export class OcorrenciaService {
  static async listarTodos(): Promise<Ocorrencia[]> {
    const response = await axios.get<Ocorrencia[]>(API_URL);
    return response.data;
  }

  static async buscarPorId(id: number): Promise<Ocorrencia> {
    const response = await axios.get<Ocorrencia>(`${API_URL}/${id}`);
    return response.data;
  }

  static async salvar(ocorrencia: Ocorrencia): Promise<number> {
    const response = await axios.post<number>(API_URL, ocorrencia);
    return response.data;
  }

  static async atualizar(id: number, ocorrencia: Ocorrencia): Promise<string> {
    const response = await axios.put<string>(`${API_URL}/${id}`, ocorrencia);
    return response.data;
  }
}