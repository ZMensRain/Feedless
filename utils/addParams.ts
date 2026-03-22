export default function AddParams() {
  let url = new URL(document.URL);

  document.querySelector(":root")?.setAttribute("page-params", url.search);
}
