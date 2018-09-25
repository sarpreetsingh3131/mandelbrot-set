# How to run:
1. Install **NPM**, **Node JS**, **Java 1.8**, and **Maven**
2. Open terminal with *mandelbrot-set* directory as root
3. Go inside the server directory using the command `cd server/`
4. Install the dependencies using the command `mvn install`
5. Go inside the target directory using the command `cd target/`
6. Run the server using the command `java -jar server-0.0.1-SNAPSHOT.jar --server.port=[PORT]`. Example: *java -jar server-0.0.1-SNAPSHOT.jar --server.port=8080*. **Note:** [PORT] is optional
7. Open new terminal with *mandelbrot-set* directory as root
8. Go inside the client directory using the command `cd client/`
9. Install the dependencies using the command `npm install`
10. Build the client using the command `npm run build`
11. Go inside the build directory using the command `cd build/`
11. Run the client using the command `node client.js [min_c_re min_c_im max_c_re max_c_im max_n x y divisions list-of-servers]`. Example: *node client.js -1 -1.5 2 1.5 1024 5000 5000 1000 localhost:8080*