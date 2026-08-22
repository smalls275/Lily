import json
import threading
import unittest
from http.client import HTTPConnection
from http.server import ThreadingHTTPServer

from server import GardenHandler


class ServerTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(("127.0.0.1", 0), GardenHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.host, cls.port = cls.server.server_address

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def get(self, path):
        connection = HTTPConnection(self.host, self.port)
        connection.request("GET", path)
        response = connection.getresponse()
        body = response.read()
        connection.close()
        return response.status, body

    def test_health_endpoint(self):
        status, body = self.get("/api/health")
        self.assertEqual(status, 200)
        self.assertTrue(json.loads(body)["ok"])

    def test_lessons_endpoint(self):
        status, body = self.get("/api/lessons")
        self.assertEqual(status, 200)
        self.assertEqual(len(json.loads(body)["lessons"]), 3)

    def test_unknown_api_route_is_not_found(self):
        status, _ = self.get("/api/secret")
        self.assertEqual(status, 404)


if __name__ == "__main__":
    unittest.main()