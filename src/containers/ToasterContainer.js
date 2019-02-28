import { connect } from 'react-redux';

import Toaster from '../components/Toaster';

function mapStateToProps (store) {
    return {
        message: store.toaster.message,
        type: store.toaster.type
    };
}

export default connect(mapStateToProps)(Toaster);
