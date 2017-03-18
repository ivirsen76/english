import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Words from 'components/Words';


// eslint-disable-next-line react/prefer-stateless-function
class Component extends React.Component {
    static propTypes = {
        list: PropTypes.array.isRequired,
    }

    render() {
        return (
            <div>
                <h2>Мои слова</h2>
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
    };
}

export default connect(mapStateToProps)(Component);
