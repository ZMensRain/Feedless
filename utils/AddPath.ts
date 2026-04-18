export function GetPath() {
  let url = new URL(document.URL);
  let path = url.pathname + "/";
  path = path.replaceAll("//", "/");
  return path;
}

export default function AddPath() {
  document.querySelector(":root")?.setAttribute("page-path", GetPath());
}
