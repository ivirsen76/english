import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Words from '../../components/Words';

export const Component = props => (
    <Words
        data={props.list}
    />
  );

Component.propTypes = {
    list: PropTypes.array.isRequired,
};


function mapStateToProps(state) {
    return {
        list: state.word.list,
    };
}

export default connect(mapStateToProps)(Component);
