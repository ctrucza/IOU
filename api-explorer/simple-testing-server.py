#!/usr/bin/env python
# See https://github.com/mathisonian/simple-testing-server/
import SimpleHTTPServer
import SocketServer

class JSONRequestHandler (SimpleHTTPServer.SimpleHTTPRequestHandler):
	def end_headers(self):
		if self.is_api_call():
			self.send_header("Access-Control-Allow-Origin", "*")
			self.send_header("Content-Type", "application/json")
			self.send_header("Cache-Control", "no-cache")

		SimpleHTTPServer.SimpleHTTPRequestHandler.end_headers(self)
	
	def is_api_call(self):
		return "api" in self.path
	
	def do_POST(self):
		SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
	
server = SocketServer.TCPServer(('localhost', 8000), JSONRequestHandler)
server.serve_forever()
