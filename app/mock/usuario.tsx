import { Usuario } from "@/app/context/AuthContext";



export class UsuarioMock{

    private static usuarioDB: Usuario[] = [
        new Usuario(1,"Professor Samuel Matos", "00000000000", true),
        new Usuario(2,"Mateus", "00000000000", true),
        new Usuario(3,"Carlos", "00000000000", true),
        new Usuario(4,"Jose", "00000000000", true),
        new Usuario(5,"Paulo", "00000000000", true)
    ];

    static async listarTodos(): Promise<Usuario[]>{
        return [...this.usuarioDB]
    }
        
}