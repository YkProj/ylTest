const host = "http://42.51.39.90:8095";
const apis = {
  validateCode: {
    api: `${host}/sendSMS/verifyCodeForReg?phone=`,
    method: "GET"
  },

  register: {
    api: `${host}/user/register`,
    method: "POST"
  }
};

const textBox = {
  req: {
    hasCors: "当前浏览器不支持Cors",
    corsRequestError: "服务器异常，请稍后再试",
  },

  validateCode: {
    isClick: "请等待一会，才能重新发送哦",
  },
};

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

function makeCorsRequest(method, url, data = {}) {
  let xhr = createCORSRequest(method, url);

  if (!xhr) {
    showToast(textBox.req.hasCors);
    return false;
  }

  xhr.onload = function () {
    let dataStr = xhr.response;
    const data = JSON.parse(dataStr);
    console.log(data);
  };

  xhr.onerror = function (e) {
    console.log(e);
  };

  xhr.send(data);
  return this;
}
