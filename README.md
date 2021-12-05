<h2 align="center">SnappyURL (RESTful API)</h2>

## 🔄 Built with

- Node.js + Express
- MongoDB Atlas

## 🚩 How to install API

#### Fork and clone this repository using

   ```bash
   git clone https://github.com/sandip2224/SnappyURL.git
   ```   
#### Install dependencies and dev dependency using

   ```bash
   npm install
   npm install -D nodemon
   ```  

#### Create a _.env_ file inside the root directory and add the following key-value pairs

   ```bash
   MONGO_URI=<Your MongoDB Cluster URL>
   ```  
   > Note: Get the following URL from MongoDB official website. You need to configure the `username`, `password` and `dbname` accordingly.
   ```bash
   mongodb+srv://<username>:<password>@cluster0.x1ccn.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

 #### Start the server locally at _localhost:3000_ using

   ```bash
   npm run dev
   ```

## 🔱 API Endpoints

```bash
GET    /:slug    -> Redirects shortened URL to original domain
POST   /shorten  -> Generate a new shortened URL for your existing URL
GET    /api/docs -> Swagger documentation for snappyURL API
```

## 🎴 License

Distributed under the MIT License. See `LICENSE` for more information.

### 👩‍💻 Project Created & Maintained By - [Sandipan Das](https://linkedin.com/in/sandipan0164)
