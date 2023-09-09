import React, {Fragment} from "react";
import axios from "axios";
import Papa from "papaparse";

//components

function InputAquivo({setDadosValidados, setShow}){    

    const onSubmitForm = async e => {
        e.preventDefault();
        e.stopPropagation();
        try {
            let file = document.querySelector("#fileInput").files[0];
            if(file){
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function(results){
                        console.log("finished parse:", results.data);
                        axios.post("http://localhost:5000/produtos", results.data)
                        .then(({data}) => {
                            console.log(data);
                            setDadosValidados(data);
                            setShow(true);
                        })
                    }
                });
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <>
            <form id="uploadFileForm" encType="" onSubmit={onSubmitForm}>
                <div className="mb-3 container mw-75">
                    <label htmlFor="formFile" className="form-label">Escolha um aquivo CSV</label>
                    <div className="d-flex">
                        <input className="form-control me-2" type="file" accept=".csv" id="fileInput"/>
                        <button className="btn btn-primary" type="submit">Validar</button>
                    </div>
                </div>
            </form>
            
        </>
    );
}

export default InputAquivo;