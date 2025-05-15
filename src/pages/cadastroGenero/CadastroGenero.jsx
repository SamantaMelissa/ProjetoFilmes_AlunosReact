import { useEffect, useState } from "react";

import api from "../../Services/services";

//importar o sweet alert:
import Swal from 'sweetalert2';

// importação de componentes:
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Lista from "../../components/lista/Lista";

const CadastroGenero = () => {

    //nome do genero 
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);


    function alerta(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function cadastrarGenero(e) {
        e.preventDefault();
        //verificar se o input está vindo vazio
        if (genero.trim() != "") {
            //try => tentar(o esperado)
            //catch => lança a exceção
            try {
                //cadastrar um gênero: post
                await api.post("genero", { nome: genero });
                alerta("success", "Cadastro realizado com sucesso!")
                setGenero("");
            } catch (error) {
                alerta("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alerta("error", "Erro! Preencha o campo")
        }
    }

    //síncrono => Acontece simutâneamente
    //assincrono => Esperar algo/resposta para ir para outro bloco de código. 
    async function listarGenero(){
        try {
            //await -> Aguarde ter uma resp da solicitação
           const resposta = await api.get("genero");
            console.log(resposta.data);
            // console.log(resposta.data[3].idGenero);
            // console.log(resposta.data[3].nome);
           setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
        }  
    }

    //funcao de excluir o genero ;)

    //teste: validar o genero
    //useEffect(<function>, <dependency>)
    // useEffect(() => {
    //     console.log(genero);
    // },[genero]);
    //fim do teste

    // Assim que a página renderizar, o método listarGenero() será chamado
    useEffect(() => {
        listarGenero();
    }, [])
    

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro de Gênero"
                    visibilidade="none"
                    placeholder="gênero"

                    //Atribuindo a função:
                    funcCadastro={cadastrarGenero}
                    //Atribuindo o valor ao input:
                    valorInput={genero}
                    //Atribuindo a função que atualiza o meu genero:
                    setValorInput={setGenero}
                />
                <Lista
                    tituloLista="Lista de Gêneros"
                    visibilidade="none"

                    //atribuir para lista, o meu estado atual:
                    lista = {listaGenero}

                    
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;