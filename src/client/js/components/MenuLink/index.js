import { NavLink } from 'react-router-dom'
import withProps from 'recompose/withProps'

export default withProps({ className: 'item', activeClassName: 'active' })(NavLink)
