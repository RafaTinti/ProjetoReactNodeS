import React, {Fragment} from "react";
import GlobalStyle from "./styles/global";

//Components
import InputAquivo from "./components/inputArquivo";

function App() {
    return (
        <>
            <div className="container card mt-5 p-4">
                <div className="card-title">
                    <h2 className="text-center mt-5">Atualizar Produtos</h2>
                </div>
                <div className="card-body px-5">
                    <InputAquivo></InputAquivo>
                </div>
            </div>
            <GlobalStyle/>
        </>
    )
};

export default App;