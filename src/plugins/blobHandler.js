function handleBlobResponse(blob, fileName) {
  
  const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/octet-stream' }));

  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName; // 设置下载文件的名称
  document.body.appendChild(a);
  a.click(); // 触发下载
  window.URL.revokeObjectURL(url); // 释放 URL
}
export default handleBlobResponse