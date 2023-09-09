import Alert from 'react-bootstrap/Alert';

function AlertResult({ showAlert, setShowAlert }) {
    let erro = showAlert.error ? "danger" : "success";
    if (showAlert) {
        return (
            <Alert variant={erro} onClose={() => setShowAlert(false)} dismissible>
                <p>
                    {JSON.stringify(showAlert.data)}
                </p>
            </Alert>
        );
    }
}

export default AlertResult;