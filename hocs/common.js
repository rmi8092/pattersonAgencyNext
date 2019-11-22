const getSeoKey = (toolsetMetaSeoTitle, pageTitle) => {
  return toolsetMetaSeoTitle ? toolsetMetaSeoTitle : pageTitle;
};

export default getSeoKey;
