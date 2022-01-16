import { trim, isType } from "@/utils";
import CryptoJS from "crypto-js"; //加密js


// 加密设置cookie
function setCookie(portId, psw, exdays) {
  // Encrypt，加密账号密码
  var cipherPortId = CryptoJS.AES.encrypt(
    portId + "",
    "secretkey123"
  ).toString();
  var cipherPsw = CryptoJS.AES.encrypt(psw + "", "secretkey123").toString();

  var exdate = new Date(); //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
  //字符串拼接cookie，为什么这里用了==，因为加密后的字符串也有个=号，影响下面getcookie的字符串切割，你也可以使用更炫酷的符号。
  window.document.cookie =
    "username" +
    "==" +
    cipherPortId +
    ";path=/;expires=" +
    exdate.toGMTString();
  window.document.cookie =
    "password" +
    "==" +
    cipherPsw +
    ";path=/;expires=" +
    exdate.toGMTString();
}

//读取加密cookie
function getCookie() {
  if (document.cookie.length > 0) {
    var arr = document.cookie.split("; "); //这里显示的格式请根据自己的代码更改
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=="); //根据==切割
      //判断查找相对应的值
      if (arr2[0] == "username") {
        // Decrypt，将解密后的内容赋值给账号
        var bytes = CryptoJS.AES.decrypt(arr2[1], "secretkey123");
        var username = bytes.toString(CryptoJS.enc.Utf8);
      } else if (arr2[0] == "password") {
        // Decrypt，将解密后的内容赋值给密码
        var bytes = CryptoJS.AES.decrypt(arr2[1], "secretkey123");
        var password = bytes.toString(CryptoJS.enc.Utf8);
      }
    }
    return {username,password};
    
  }
}

// 取cookie
function get(key) {
  if (!key || !_has(key)) {
    return null;
  }
  let regexpStr =
    "(?:^|.*;\\s*)" +
    escape(key).replace(/[-.+*]/g, "\\$&") +
    "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*";
  return JSON.parse(unescape(window.document.cookie.replace(new RegExp(regexpStr), "$1")));
}

function all() {
  let cookies = window.document.cookie.split(/; ?/g),
    data = {};
  for (let i = cookies.length - 1; i >= 0; i--) {
    if (!trim(cookies[i])) {
      continue;
    }
    let kvp = cookies[i].split("=");
    let key = unescape(kvp[0]);
    data[key] = unescape(kvp[1]);
  }
  return data;
}

// 存cookie
function set(key, data, time) {
  if (!key) {
    return;
  }
  var expiresds = new Date(); //获取时间
  expiresds.setTime(expiresds.getTime() + 24 * 60 * 60 * 1000 * time); //保存的天数
  data = JSON.stringify(data);
  window.document.cookie =
    escape(key) + "=" + escape(data) + "; expires=" + expiresds + "; path=/";
}





function remove(key) {
  if (!key || !_has(key)) {
    return;
  }
  window.document.cookie = escape(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}

function clearAll() {
  Object.keys(all()).forEach(function (key) {
    remove(key);
  });
}

function _has(key) {
  return new RegExp(
    "(?:^|;\\s*)" + escape(key).replace(/[-.+*]/g, "\\$&") + "\\s*\\="
  ).test(window.document.cookie);
}

export default {
  setCookie,
  getCookie,
  get,
  all,
  set,
  remove,
  clearAll,
  has: _has
};
