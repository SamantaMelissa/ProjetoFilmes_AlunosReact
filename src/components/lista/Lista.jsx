import "./Lista.css";

// Importação de imagens:
import Editar from "../../assets/img/pen-to-square-solid.svg";
import Excluir from "../../assets/img/trash-can-regular.svg";

const Lista = (props) => {
    return(
        <section className="layout_grid">
            <div className="listagem">

            <h1>{props.tituloLista}</h1>
            <hr/>
            <div className="tabela">
                <table>
                    {/* cabeçalho da tabela: */}
                    <thead>
                        {/* tr => table row */}
                        <tr className="table_cabecalho">
                            {/* th => table head */}
                            <th>Nome</th>
                            <th style={{display:props.visibilidade}}>Gênero</th>
                            <th>Editar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    {/* tbody => corpo da tabela */}
                    <tbody>
                        {/* verificar se a lista está vindo vazia */}
                        {props.lista && props.lista.length > 0 ? (
                            //Vamos mapear os itens da lista
                            props.lista.map((item) => (
                                //dando um identificador para cada linha da lista
                                <tr className="item_lista" key={item.idGenero}>
                                    <td data-cell="Nome">
                                        {item.nome}
                                    </td>
                                    <td data-cell="Gênero" style={{display:props.visibilidade}}>Ação</td>
                                    <td data-cell="Editar"><img src={Editar} alt="Caneta"/></td>
                                    <td data-cell="Excluir">
                                        <img src={Excluir} alt="Lixeira"/>
                                    </td>
                                </tr>
                            ))
                        )  :
                        (
                            <p>Nenhum gênero foi encontrado.</p>
                        )
                    }
                    </tbody>
                </table>
            </div>
            </div>
        </section>
    )
}

export default Lista;

