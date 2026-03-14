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

    static async salvar(usuario:Usuario) : Promise<void>{

        const indexExistente = this.usuarioDB.findIndex(u=> u.codigo === usuario.codigo);

        const novoCodigo = Math.max(...this.usuarioDB.map(u=>u.codigo))+1;

        if(indexExistente=== -1){

            usuario.codigo = novoCodigo;
            this.usuarioDB.push(usuario);
            console.log(`Usuário de 10 ${novoCodigo} salvo com sucesso!`);
        
        }else{
            this.usuarioDB[indexExistente].nome = usuario.nome;
            this.usuarioDB[indexExistente].cpf = usuario.cpf;
            console.log(`Usuário de 10 ${usuario.codigo} atualizado com sucesso!`);
        }
    }

    static async buscarPorId(codigo:Number):Promise<Usuario|undefined>{
        return this.usuarioDB.find(u=>u.codigo === codigo)
    }
        
}