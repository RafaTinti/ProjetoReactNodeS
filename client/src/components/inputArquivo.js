import React, {Fragment, useState} from "react";
import axios from "axios";
import Papa from "papaparse";

function InputAquivo(){

    const onSubmitForm = async e => {
        e.preventDefault();
        e.stopPropagation();
        try {
            let file = document.querySelector("#fileInput").files[0];
            console.log(file);
            if(file){
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: function(results){
                        console.log("finised:", results.data);
                        axios.post("http://localhost:5000/produtos", results.data);
                    }
                });
            }
            // let formData = new FormData();
            // let file = document.querySelector("#fileInput");
            // console.log(file.files[0]);
            // formData.append("file", file.files[0]);
            // console.log('>> formData >>', formData);
            // await axios.post("http://localhost:5000/produtos", file.files[0], {
            //     headers: {
            //       'Content-Type': "multipart/form-data",
            //     }
            // });
            console.log("im running");
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