import React from "react";
import { Helmet } from "react-helmet";

const HeadHelmet = ({ title, desc, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default HeadHelmet;
