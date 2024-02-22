FROM nginx:latest
COPY ./ /usr/share/nginx/html/
RUN chown -R www-data:www-data /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html/