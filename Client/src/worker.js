// worker.js
self.addEventListener("message", function (event) {
  // Nhận thông điệp từ máy chủ
  const data = event.data;

  // Xử lý dữ liệu vị trí chuột và trả về kết quả

  console.log("data");
  const result = processData(data);

  // Gửi kết quả về cho máy chủ
  self.postMessage(result);
});

function processData(data) {
  // Thực hiện xử lý dữ liệu vị trí chuột ở đây
  // Ví dụ: tính toán vị trí mới của con trỏ chuột
  return processedData;
}
