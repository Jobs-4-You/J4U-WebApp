import React from "react";
import { observer } from 'mobx-react';
import Input from "./Input";
import appStore from 'js/stores/appStore';

function FormContainer(props) {
  return (
    <form id="article-form">
      <Input
        text="SEO title"
        label="seo_title"
        type="text"
        id="seo_title"
      />
    </form>
  );
}

export default observer(FormContainer);