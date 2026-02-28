export default function NoParams(url: string): string {
  let obj = new URL(url);

  url = obj.origin + obj.pathname;

  if (url[url.length - 1] != "/") url += "/";

  return url;
}
