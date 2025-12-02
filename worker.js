export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    const key = path.replace(/^\//, '');
    const data = await env.__STATIC_CONTENT.get(key);
    if (!data) return new Response('Not Found', { status: 404 });
    const ext = key.split('.').pop().toLowerCase();
    const ct =
      ext === 'html' ? 'text/html' :
      ext === 'css' ? 'text/css' :
      ext === 'js' ? 'application/javascript' :
      ext === 'png' ? 'image/png' :
      (ext === 'jpg' || ext === 'jpeg') ? 'image/jpeg' :
      ext === 'svg' ? 'image/svg+xml' :
      ext === 'pdf' ? 'application/pdf' :
      'application/octet-stream';
    return new Response(data.body, { headers: { 'Content-Type': ct }});
  }
}
