import React, { Fragment } from 'react';

const Toaster = ({ message, type }) => (
    <Fragment>
        {message && (
            <div className={`notificacaoMsg notificacaoMsg--${type}`}>
                {message}
            </div>
        )}
    </Fragment>
);

export default Toaster;
