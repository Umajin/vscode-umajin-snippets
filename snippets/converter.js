const json = require("./s.json");
const fs = require("fs");
for (const key in json) {
  if (json.hasOwnProperty(key)) {
    const element = json[key];
    let body = element.body;

    if (typeof body !== "string") {
      continue;
    }

    let prefixIndex = body.indexOf("(");
    let suffixIndex = body.indexOf(")");

    let prefix = body.substring(0, prefixIndex + 1);
    let params = body.substring(prefixIndex + 1, suffixIndex).split(",");
    let suffix = body.substring(suffixIndex, body.length);

    // ${1:${TM_FILENAME_BASE}}
    let decoratedParams = params.map((item, index) => {
      let str = "";
      if (prefixIndex + 1 === suffixIndex) {
        str = params[0];
      } else {
        str = "'${" + (index + 1) + ":" + item.trim() + "}'";
      }
      if (index == 0) {
        str = prefix + str;
      }
      if (index == params.length - 1) {
        str = str + suffix;
      }
      return str;
    });
    // decoratedParams.push("");
    finalArray = [];
    finalArray.push(decoratedParams.join(", "));
    finalArray.push("");
    element.body = finalArray;
  }
}

// console.log(json);
fs.writeFile(
  "unformatted_snippets.json",
  JSON.stringify(json),
  "utf-8",
  (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log("done done done");
  }
);
