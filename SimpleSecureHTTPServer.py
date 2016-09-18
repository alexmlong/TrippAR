'''
SimpleSecureHTTPServer.py - simple HTTP server supporting SSL.

- replace fpem with the location of your .pem server file.
- the default port is 443.

usage: python SimpleSecureHTTPServer.py [server.pem] [port]

prereq: make a cert!
openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes

Source:
http://code.activestate.com/recipes/442473-simple-http-server-supporting-ssl-secure-communica/
'''
import socket, sys, os
import logging
import cgi
from SocketServer import BaseServer
from BaseHTTPServer import HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler
from OpenSSL import SSL


class SecureHTTPServer(HTTPServer):
    def __init__(self, server_address, HandlerClass, fpem):
        BaseServer.__init__(self, server_address, HandlerClass)
        ctx = SSL.Context(SSL.SSLv23_METHOD)
        #server.pem's location (containing the server private key and
        #the server certificate).
        ctx.use_privatekey_file (fpem)
        ctx.use_certificate_file(fpem)
        self.socket = SSL.Connection(ctx, socket.socket(self.address_family,
                                                        self.socket_type))
        self.server_bind()
        self.server_activate()

    # python 2.6 vs python 2.7 bug.
    def shutdown_request(self,request):
        request.shutdown()

class SecureHTTPRequestHandler(SimpleHTTPRequestHandler):
    def setup(self):
        self.connection = self.request
        self.rfile = socket._fileobject(self.request, "rb", self.rbufsize)
        self.wfile = socket._fileobject(self.request, "wb", self.wbufsize)

    def do_POST(self):
        self.do_GET()
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST',
                     'CONTENT_TYPE':self.headers['Content-Type'],
                     })
        for item in form.list:
            logging.info(item)



def test(HandlerClass = SecureHTTPRequestHandler,
         ServerClass = SecureHTTPServer, fpem="server.pem", port=443):
    server_address = ('', port) # (address, port)
    httpd = ServerClass(server_address, HandlerClass, fpem)
    sa = httpd.socket.getsockname()
    print "Serving HTTPS on", sa[0], "port", sa[1], "..."
    httpd.serve_forever()


if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    if len(sys.argv) > 2:
        test(fpem=sys.argv[1], port=int(sys.argv[2]))
    if len(sys.argv) > 1:
        test(fpem=sys.argv[1])
    test()

