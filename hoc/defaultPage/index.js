import { compose } from "redux";
import WithData from "./withData";
import WithLang from "../withLang";
import withLayout from "./withLayout";
import withTheme from "../withTheme";

export default compose(WithData, WithLang, withLayout, withTheme);
