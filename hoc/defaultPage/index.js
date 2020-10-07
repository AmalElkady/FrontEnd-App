import {compose} from 'redux';
import WithData from './withData';
import WithLang from '../withLang';
import withLayout from "./withLayout";

export default compose(
  WithData, WithLang, withLayout
);
