import React, {Fragment, useState} from "react";
import GlobalStyle from "./styles/global";

//Components
import InputAquivo from "./components/inputArquivo";
import DisplayModal from "./components/displayModal";
import AlertResult from "./components/Alert";

function App() {
    const [dadosValidados, setDadosValidados] = useState([]);
    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    return (
        <>
            <AlertResult showAlert={showAlert} setShowAlert={setShowAlert}></AlertResult>
            <div className="container card mt-5 p-4">
                <div className="card-title">
                    <h2 className="text-center mt-5">Atualizar Produtos</h2>
                </div>
                <div className="card-body px-5">
                    <InputAquivo setDadosValidados={setDadosValidados} setShow={setShow}></InputAquivo>
                </div>
            </div>
            <GlobalStyle/>
            <DisplayModal dadosValidados={dadosValidados} show={show} setShow={setShow} setShowAlert={setShowAlert}></DisplayModal>
        </>
    )
};

export default App;