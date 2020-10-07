import {compose} from 'redux';
import WithData from './withData';
import WithLayout from './withLayout';
import WithLang from '../withLang';

export default compose(
  WithData,
  WithLang,
  WithLayout
);
