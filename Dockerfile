# Creates a simple Nginx web server to serve my static website.

FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
