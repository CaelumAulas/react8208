import Tweet from './../components/Tweet';
import { connect } from 'react-redux';

function mapaDaStore () {
    return {};
}

function mapaDeActions (dispatch) {
    return {
        onLike: (id) => {
            dispatch({
                type: 'LIKE_TWEET',
                payload: id
            })
        }
    }
}

export default connect(mapaDaStore)(Tweet);
