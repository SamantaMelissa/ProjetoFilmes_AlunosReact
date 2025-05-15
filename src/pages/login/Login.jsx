import Logo from "../../assets/img/logo.svg";
import "./Login.css";
import Botao from "../../components/botao/Botao.jsx";

import { Switch } from "@headlessui/react";

import { useState } from "react";

const Login = () => {
    const [enabled, setEnabled] = useState(false);
    return (
        <main className="main_login">
            <div className="banner"></div>
            <section className="section_login">
                <img src={Logo} alt="Logo do Filmoteca" />
                <form action="" className="form_login">
                    <h1>Login</h1>
                    <div className="campos_login">
                        <div className="campo_input">
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" placeholder="Digite seu e-mail" />
                        </div>
                        <div className="campo_input">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" name="senha" placeholder="Digite sua senha" />
                        </div>
                    </div>
                    <Botao nomeDoBotao="Entrar" />
                </form>

                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-blue-600"
                >
                    <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                </Switch>

            </section>

        </main>
    )
}

export default Login;