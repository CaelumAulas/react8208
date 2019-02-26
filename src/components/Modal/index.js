import React from 'react'

import Widget from '../Widget';

import './modal.css'
const modalVisibilityState = (isOpen) => isOpen && 'modal--active'
const Modal = (props) => {
    return (
        <div
            className={`modal ${modalVisibilityState(props.isOpen)}`}
            onClick={(evento) => props.onClose(evento)}
        >
            <div className="modal__conteudo" >
                <Widget>
                    {      
                        // curto circuito
                        props.isOpen && props.children
                    }
                </Widget>
            </div>
        </div>
    )
}

export default Modal