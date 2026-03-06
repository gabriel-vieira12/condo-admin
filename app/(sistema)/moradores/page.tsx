'use client';

export default function ListaMoradores() {
  // Exemplo de como os dados aparecem (viriam do seu AuthContext ou Banco)
  const moradores = [
    { id: 1, nome: "João Silva", unidade: "A-102", proprietario: true, contato: "joao@email.com" },
    { id: 2, nome: "Maria Oliveira", unidade: "B-205", proprietario: false, contato: "(11) 9999-8888" },
  ];

  return (
    <div className="p-8 bg-[#F9F8F6] min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-stone-900">Moradores <span className="text-[#6B4E3D]">Cadastrados</span></h1>
            <p className="text-stone-500">Listagem completa de residentes por unidade.</p>
          </div>
          {/* Botão que levaria para a tela de cadastro que já fizemos */}
          <button className="bg-[#6B4E3D] text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg transition-all">
            + Novo Morador
          </button>
        </header>

        {/* LISTA ESTILO "CARDS" (Igual aos recursos da sua Landing Page) */}
        <div className="space-y-4">
          {moradores.map((m) => (
            <div key={m.id} className="bg-white p-6 rounded-[2rem] border border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-stone-800 text-lg">{m.nome}</h3>
                  <p className="text-sm text-stone-400 font-medium">{m.contato}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] font-black text-stone-400 uppercase">Unidade</p>
                  <p className="font-bold text-[#6B4E3D]">{m.unidade}</p>
                </div>

                {/* LOGICA DO PROPRIETÁRIO */}
                <div className="min-w-[100px] text-center">
                  {m.proprietario ? (
                    <span className="text-[10px] font-black bg-stone-900 text-white px-3 py-1 rounded-full uppercase italic">
                      Proprietário
                    </span>
                  ) : (
                    <span className="text-[10px] font-black bg-stone-200 text-stone-500 px-3 py-1 rounded-full uppercase">
                      Inquilino
                    </span>
                  )}
                </div>

                <button className="text-stone-300 hover:text-red-500 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}