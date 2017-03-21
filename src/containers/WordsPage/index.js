import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Words from 'components/Words';
import AddWord from 'components/AddWord';
import { addWord } from 'reducers/word';
import { getNextNewId, getLatestLabel } from 'selectors/word';


// eslint-disable-next-line react/prefer-stateless-function
class Component extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
        addWord: PropTypes.func.isRequired,
        nextNewId: PropTypes.number.isRequired,
        latestLabel: PropTypes.string.isRequired,
    }

    render() {
        return (
            <div>
                <h2>Мои слова</h2>
                <AddWord
                    addWord={this.props.addWord}
                    nextNewId={this.props.nextNewId}
                    latestLabel={this.props.latestLabel}
                />
                <Words
                    data={this.props.list}
                />
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        list: state.word.list,
        nextNewId: getNextNewId(state),
        latestLabel: getLatestLabel(state),
    };
}

export default connect(mapStateToProps, {
    addWord,
})(Component);
