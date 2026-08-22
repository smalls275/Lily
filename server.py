"""A tiny standard-library web server for Lily's coding garden."""

import json
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LESSONS = [
    {"id": "html", "title": "HTML", "description": "Build the page."},
    {"id": "javascript", "title": "JavaScript", "description": "Make it respond."},
    {"id": "python", "title": "Python", "description": "Solve bigger puzzles."},
]


class GardenHandler(SimpleHTTPRequestHandler):
    """Serve the site and a small JSON API from the project directory."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def do_GET(self):
        if self.path == "/api/health":
            self._send_json({"ok": True, "message": "Python server is ready"})
            return
        if self.path == "/api/lessons":
            self._send_json({"lessons": LESSONS})
            return
        if self.path.startswith("/api/"):
            self.send_error(HTTPStatus.NOT_FOUND, "API route not found")
            return
        super().do_GET()

    def _send_json(self, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(HTTPStatus.OK)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def run(host="127.0.0.1", port=8000):
    server = ThreadingHTTPServer((host, port), GardenHandler)
    print(f"Lily's Coding Garden: http://{host}:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
    finally:
        server.server_close()


if __name__ == "__main__":
    run()