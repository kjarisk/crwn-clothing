import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import "./preview-collection.styles.scss";

const CollectionPreview = ({ title, items, match, history, }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
      .filter((item, idx) => idx < 4)
      .map((itm) => (
        <CollectionItem key={itm.id} item={itm} />
      ))}
    </div>
  </div>
);

export default withRouter(CollectionPreview);
