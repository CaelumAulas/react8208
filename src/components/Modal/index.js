import React from 'react'
import './modal.css'
const modalVisibilityState = (isOpen) => isOpen && 'modal--active'
const Modal = (props) => {
    return (
        <div className={`modal ${modalVisibilityState(props.isOpen)}`}>
            {      
                // curto circuito
                props.isOpen && props.children
            }
        </div>
    )
}

export default Modal