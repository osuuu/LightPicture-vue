export function trim(str) {
  return String.prototype.trim.call(str);
}

export function isType(arg, type) {
  return Object.prototype.toString.call(arg) === "[object " + type + "]";
}

export function isWeixin() {
  return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
}

// 存储单位转换
export function toSize(val) {
  let size = Number(val)
  if (size / 1024 / 1024 / 1024 / 1024 >= 1) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + " TB"
  } else
  if (size / 1024 / 1024 / 1024 >= 1) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + " GB"
  } else
  if (size / 1024 / 1024 >= 1) {
    return (size / 1024 / 1024).toFixed(2) + " MB"
  } else
  if (size / 1024 >= 1) {
    return (size / 1024).toFixed(2) + " KB"
  } else {
    return size.toFixed(2) + " B"
  }
}

export function parseQuery() {
  const res = {};

  const query = (location.href.split("?")[1] || "")
    .trim()
    .replace(/^(\?|#|&)/, "");

  if (!query) {
    return res;
  }

  query.split("&").forEach(param => {
    const parts = param.replace(/\+/g, " ").split("=");
    const key = decodeURIComponent(parts.shift());
    const val = parts.length > 0 ? decodeURIComponent(parts.join("=")) : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res;
}



const VUE_APP_API_URL = process.env.VUE_APP_API_URL || `${location.origin}/api`;
const VUE_APP_WS_URL =
  process.env.VUE_APP_WS_URL || `ws:${location.hostname}:20003`;

export {
  VUE_APP_API_URL,
  VUE_APP_WS_URL
};