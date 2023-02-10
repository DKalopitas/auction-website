import { useState } from "react";
import { Toast } from "react-bootstrap";

export default function ErrorPopup({ errorMessage }) {

    const [show, setShow] = useState(true);

    return(
        <Toast 
        onClose={() => setShow(false)} 
        show={show} 
        delay={5000} 
        autohide 
        className="position-absolute bottom-0 end-0 bg-dark bg-opacity-50 rounded-2 text-danger p-3 mb-2 me-2"
        >
            <div>
                <h6>Error</h6>
                {errorMessage}
            </div>
        </Toast>
    );

};