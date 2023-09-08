import React, {Fragment, useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { FaCheck, FaTimes } from "react-icons/fa";

function DisplayModal( {dadosValidados, show, setShow}){
    

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const atualizarRegistro = (data) => {
        handleClose();
        //
    };
  

    let disableBtn = dadosValidados.some((e) => !e.valido) ? "disabled" : ""
    return (
        <>  
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Revisão dos dados enviados</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nome</th>
                                <th>Preço Atual</th>
                                <th>Novo Preço</th>
                                <th>Válido</th>
                                <th>Erro</th>
                            </tr>
                            {dadosValidados.map((item, i) => (
                            <tr key={i}>
                                <td>{item.codigo}</td>
                                <td>{item.nome}</td>
                                <td>{item.preco_atual}</td>
                                <td>{item.preco_novo}</td>
                                <td>
                                    {item.valido ? <FaCheck></FaCheck>: <FaTimes></FaTimes>}
                                </td>
                                <td>
                                    {item.erro}
                                </td>
                            </tr>
                            ))}
                        </thead>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Voltar
                    </Button>
                    <Button variant="primary" onClick={atualizarRegistro({dadosValidados})} disabled={disableBtn}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DisplayModal

// return (
//     <>
//         <div className="modal fade" id="displayModal" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title" id="displayModalLabel">Revisão dos dados enviados</h5>
                        
//                     </div>
//                     <div className="modal-body">
//                         ...
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
//                         <button type="button" className="btn btn-primary">Atualizar</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </>