import Login from './Login';
import withSession from '../../lib/hoc/withSession';

export default withSession(Login, { secured: false });
