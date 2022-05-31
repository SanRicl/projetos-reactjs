import React from "react";
import "./textInput.css";

const TextInput = ({ searchValue, onChange }) => {
  return <input type="search" onChange={onChange} value={searchValue} placeholder="Digite sua busca"/>;
};

export default TextInput;
