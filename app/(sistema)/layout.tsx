import Footer from "../components/Footer";
import Header from "../components/Header";

export default function SistemaLayout({children}:
    {children:React.ReactNode}){
    return(
            <div className="flex flex-col min-h-screen">
              
              {/* <Sidebar /> */}
              <Header />
    
              {/* O segredo: flex-1 faz o main ocupar todo o espaço restante */}
              <main className="flex-1">
                <div className="max-w-7xl mx-auto p-4 md:p-8">
                  {children}
                </div>
              </main>
    
              <Footer />
    
            </div>
    )  
}