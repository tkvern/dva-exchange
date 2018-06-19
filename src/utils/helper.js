// Operation LocalStorage
export function setLocalStorage(key, vaule) {
  return localStorage.setItem(key, JSON.stringify(vaule));
}

export function getLocalStorage(key) {
  const value = JSON.parse(localStorage.getItem(key));
  return value;
}

// Operation Cookie
export function setCookie(c_name, value, expireMinute) {
  var exdate = new Date()
  exdate.setTime(exdate.getTime() + expireMinute * 60 * 1000);
  document.cookie = c_name + "=" + escape(value) +
    ((expireMinute == null) ? "" : ";expires=" + exdate.toGMTString())
}

export function getCookie(c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + "=")
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(";", c_start)
      if (c_end === -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}

export function delCookie(name) {
  setCookie(name, "", -1);
}

export function getRecordType(record_type) {
  let data = "";
  switch (record_type) {
    case 1:
      data = '充值';
      break;
    case 2:
      data = '赠送';
      break;
    case 3:
      data = '盈利';
      break;
    case 4:
      data = '下注';
      break;
    case 5:
      data = '兑换';
      break;
    case 6:
      data = '签到';
      break;
    default:
      data = 'unknown';
  }
  return data;
}
