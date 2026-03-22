export default function AddPath() {
  let url = new URL(document.URL);
  let path = url.pathname + "/";
  path = path.replaceAll("//", "/");

  document.querySelector(":root")?.setAttribute("page-path", path);
}
