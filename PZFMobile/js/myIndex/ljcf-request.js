const HOST = 'http://zkp.natapp1.cc'; // 请求地址

function hasOwnProperty(target, key) {

}

function createCORSRequest(method, url) {
  const xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {

    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {

    // CORS not supported.
    xhr = null;
  }

  return xhr;
}

/**
 * 
 * @param {*} method 
 * @param {*} url 
 * @param {*} success 成功回调 
 * @param {*} fail 失败回调
 * @param {*} data 参数
 */
content = 'demo'

function ljcfRequset(method, api, data, success, fail) {
  const url = `${HOST}${api}`;
  let xhr = createCORSRequest(method, url);

  if (!xhr) {
    print('当前浏览器不支持，请更换浏览器');
    return false;
  }

  xhr.onload = function () {
    try {
      let dataStr = xhr.response;
      const data = JSON.parse(dataStr);
      success(data);
      print(`get date from ${url} success\nresult:${dataStr}`);
    } catch (error) {
      print(`get data from ${url} failed`)
    }
  };

  xhr.onerror = function (e) {
    fail({ data, e });
    print(e);
  };

  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
  print(`method:${method}\nsend to${HOST}${url}\n`);
  return this;
}

// 请求示例
ljcfRequset('post','/user/updatePhoneNo',{
  userId: 1,
  phone:"17612034120",
  loginPwd:"123456",
  code:"091248"
}, (res) => {}, (res) => {});