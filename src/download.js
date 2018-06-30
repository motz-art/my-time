/* eslint-env browser */

export default function downloadObjectAsJson(obj, fileName) {
  var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(obj, null, 2));
  var downloadAnchorNode = document.createElement('a');
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.setAttribute('download', fileName);
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
