export default function err(err) {
  if (err && err.response) {
    console.log("err.response.status::", err.response.status);
    console.log("err.response::", err.response);
  }
}
