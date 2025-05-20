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

    //Só criamos useState quando precisamos guardar uma informação que muda e que o React precisa acompanhar.
    //Quem eu vou manipular??????
    const [genero, setGenero] = useState("");
    const [listaGenero, setListaGenero] = useState([]);

    function alertar(icone, mensagem) {
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

    // useEffect(()=>{
    //     alertar("success", "Lista modificada");
    //     //ao nascer
    //     //alterada(excluir, editar um item ou adicionar um item)
    // },[]);

    async function cadastrarGenero(e) {
        e.preventDefault();
        //verificar se o input está vindo vazio
        if (genero.trim() != "") {
            //try => tentar(o esperado)
            //catch => lança a exceção
            try {
                //cadastrar um gênero: post
                await api.post("genero", { nome: genero });
                alertar("success", "Cadastro realizado com sucesso!")
                setGenero("");
                //atualiza minha lista assim que cadastrar um novo genero
                // listarGenero();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!")
                console.log(error);
            }
        } else {
            alertar("error", "Erro! Preencha o campo")
        }
    }
    //síncrono => Acontece simutâneamente
    //assincrono => Esperar algo/resposta para ir para outro bloco de código. 
    async function listarGenero() {
        try {
            //await -> Aguarde ter uma resp da solicitação
            const resposta = await api.get("genero");
            // console.log(resposta.data);
            // console.log(resposta.data[3].idGenero);
            // console.log(resposta.data[3].nome);
            setListaGenero(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    //funcao de excluir o genero ;)
    async function excluirGenero(id) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });
        swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possível reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await api.delete(`genero/${id.idGenero}`)
                    // alertar("success", "Gênero excluído com sucesso!")
                    swalWithBootstrapButtons.fire({
                        title: "Deletado!",
                        text: "O gênero foi deletado.",
                        icon: "success"
                    });
                    // listarGenero();
                } catch (error) {
                    console.log(error);
                }
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado!",
                    text: "Seu gênero não foi excluído :)",
                    icon: "error"
                });
            }
        });

    }

    async function editarGenero(genero) {
        // console.log(genero);
        const { value: novoGenero } = await Swal.fire({
            title: "Modifique seu gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: genero.nome,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });
        if (novoGenero) {
            try {
                // console.log(genero.nome);
                // console.log(novoGenero);
                await api.put(`genero/${genero.idGenero}`, {nome: novoGenero});    
                Swal.fire(`O gênero modificado ${novoGenero}`);
            } catch (error) {
                console.log(error); 
            }
        }
    }

    //teste: validar o genero
    //useEffect(<function>, <dependency>)
    // useEffect(() => {
    //     console.log(genero);
    // },[genero]);
    //fim do teste

    // Assim que a página renderizar, o método listarGenero() será chamado
    useEffect(() => {
        listarGenero();
    }, [listaGenero])

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
                    lista={listaGenero}

                    funcExcluir={excluirGenero}
                    funcEditar={editarGenero}
                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroGenero;