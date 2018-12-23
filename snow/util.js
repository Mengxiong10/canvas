const loadScript = (url) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'utf-8';
  script.async = true;
  script.src = url;
  return script;
};

const loadStyle = (url) => {
  const style = document.createElement('link');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  style.href = url;
  return style;
};

const resourceList = [];

export default function loadResource(urls) {
  let list = [];
  if (typeof urls === 'string') {
    list.push(urls);
  } else if (Array.isArray(urls)) {
    list = urls;
  }
  const head = document.getElementsByTagName('head')[0];
  const promiseLoad = list.map((url) => {
    if (resourceList.indexOf(url) !== -1) return Promise.resolve('loaded');
    const getTag = /\.css$/.test(url) ? loadStyle : loadScript;
    return new Promise((resolve, reject) => {
      const tag = getTag(url);
      tag.onload = () => {
        resourceList.push(url);
        resolve('loaded');
      };
      tag.onerror = (err) => reject(err);
      head.appendChild(tag);
    });
  });
  return Promise.all(promiseLoad);
}
