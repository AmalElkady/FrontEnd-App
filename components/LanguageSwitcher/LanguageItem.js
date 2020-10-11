import React from "react";
import { useDispatch } from "react-redux";

const LanguageItem = ({ language, switchLanguage, handleRequestClose }) => {
  const { icon, name } = language;
  const dispatch = useDispatch();
  return (
    <li
      className="pointer"
      onClick={() => {
        console.log("language from component  ", language.name);
        handleRequestClose();
        dispatch(switchLanguage(language));
      }}
    >
      <div className="d-flex align-items-center">
        <i className={`flag flag-24 flag-${icon}`} />
        <h4 className="mb-0 ml-2">{name}</h4>
      </div>
    </li>
  );
};

export default LanguageItem;
