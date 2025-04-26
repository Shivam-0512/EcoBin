import http.server
import socketserver
import os

# Set the port
PORT = 8000

# Change to the directory containing your HTML files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create the server
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Server started at http://localhost:{PORT}")
print("Press Ctrl+C to stop the server")

# Start the server
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    httpd.server_close() 