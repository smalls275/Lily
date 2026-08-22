# Lily's Coding Garden

A dependency-free learning project for HTML, JavaScript, and Python.

## Project map

- `index.html` contains the lessons and an HTML editor with a live preview.
- `app.js` handles the JavaScript greeting, saved lesson progress, and server status.
- `server.py` serves the site and provides `/api/health` and `/api/lessons` JSON routes.
- `test_server.py` tests the API and rejects unknown API routes.

## Run it

With Python 3 installed, run:

```text
python server.py
```

Then open `http://127.0.0.1:8000`. Opening `index.html` directly also works for the browser lessons, but the Python server enables the server status check and API data.

Run the tests with:

```text
python -m unittest test_server.py -v
```

## Learning path

1. Change the HTML in the editor and watch the preview update.
2. Change the name in `app.js` and click **Run JavaScript**.
3. Mark lessons explored. Progress is saved only in this browser on this computer.
4. Change `stars` in the Python example and run it with Python.