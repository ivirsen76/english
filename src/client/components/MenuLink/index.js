import { Link } from 'react-router'
import withProps from 'recompose/withProps'

export default withProps({ className: 'item', activeClassName: 'active' })(Link)
