import React, {Fragment, useState} from "react";
import axios from "axios";

function InputAquivo(){

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            var formData = new FormData();
            var file = document.querySelector("#fileInput");
            formData.append("file", file.files[0]);
            await axios.post("http://localhost:5000", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
            });
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