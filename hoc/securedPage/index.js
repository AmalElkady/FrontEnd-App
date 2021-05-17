import { compose } from "redux";
import WithData from "./withData";
import WithLayout from "./withLayout";
import WithLang from "../withLang";
import withTheme from "../withTheme";
import { Connection } from "./Connection";

export default compose(WithData, WithLang, WithLayout, withTheme);
