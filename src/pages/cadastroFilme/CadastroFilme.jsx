// import { Fragment } from "react";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";

const CadastroFilme = () => {
    return(
        <>
            <Header/>
            <main>
                <Cadastro 
                    tituloCadastro="Cadastro de Filme"
                    placeholder = "filme"
                />
                <Lista
                    tituloLista = "Lista de Filmes"
                />
            </main>
            <Footer/>
        </>
    )
}

export default CadastroFilme;