export const stripHTMLTags = (htmlString) => {
  return htmlString.replace(/<br>/g, "\n").replace(/<[^>]+>/g, "");
};

export const replaceMergeTags = (data, htmlString) => {
  Object.keys(data)?.forEach((key) => {
    if (htmlString.includes(`{{ ${key} }}`)) {
      let val = data[key];

      const regexPattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
      htmlString = htmlString.replace(regexPattern, val);
    }
  });

  return htmlString;
};
