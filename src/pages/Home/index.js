import Home from './Home';
import withSession from '../../lib/hoc/withSession';

export default withSession(Home, { secured: true });
