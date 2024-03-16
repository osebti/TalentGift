# Deployment Instructions
## Prerequisites
You must have a Linux instance to set up the frontend and backend. It is recommended that you use separate Linux instances for the frontend and backend (i.e. set up 2 Linux instances for this application). This tutorial assumes that you have 2 Linux instances set up (one for the frontend, and one for the backend). This tutorial is tested using `Ubuntu 22.04` instances and is only validated for this operating system.

## Frontend
Before proceeding, ensure you have a Linux instance set up for the frontend.

### Step 1: Clone the project GitHub Repository onto your Linux instance
1. In the repository page on GitHub, click Code. Select HTTPS and copy the repository url
2. In your Linux instance, run ```git clone [repository_url]``` where repository_url is the url you copied in the previous step

### Step 2: Install npm and Node.js
1. Refresh your server’s local package index: ```sudo apt update```
2. Run ```sudo apt install npm```
3. Run ```sudo apt install nodejs```
4. The version of Node.js installed in the previous step will not be the latest version (Ubuntu 22.04 supports Node.js version 12.22.9). You will need to run the following commands to update Node.js to the latest version:
```bash
sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update && sudo apt-get install nodejs -y
```

### Step 3: Set up Nginx
Follow the steps outlined in the “Set Up Nginx” section of the deployment instructions

### Step 4: Build the applicationv
1. Navigate to the frontend folder of the codebase
```bash
cd [repository_name]
cd frontend
```
> - where repository_name is the name of the repository (e.g. f23project-talent-gift)
2. Install all dependencies required for the application to run: ```npm i```
3. Run ```npm run build``` 
> - Note: The JavaScript heap may run out of memory during the build process. If this happens, run ```export NODE_OPTIONS=--max-old-space-size=8192``` to add more space to the heap.
Return to the root directory for the next step: ```cd ~```

### Step 5: Set up a server block
1. Navigate to /var/www/: ```cd /var/www/```
2. Create a directory to place build contents inside
```bash
mkdir react
cd react
mkdir html
```
3. To avoid a possible hash buck memory problem from adding additional server names, go to /etc/nginx/nginx.conf: ```vim /etc/nginx/nginx.conf``` and remove the # symbol from the ```server_names_hash_bucket_size``` directive.

### Step 6: Configure server for frontend
1. Navigate to the sites-available directory: ```cd /etc/nginx/sites-available/```
2. Open the default configuration file: ```vim default```
3. Modify the configuration file root and server name. The file should be similar to the following after you modify the file:
```
server {
    listen 80;
    listen [::]:80;

    root /var/www/react/html;
    index index.html index.htm index.nginx-debian.html;

    server_name react [your_ipv6_address];

    location / {
            try_files $uri $uri/ =404;
    }
}
```
> - where your_ipv6_address is the IPv6 address of your Linux instance. The square brackets around “your_ipv6_address” must be included.
4. Change ```try_files $uri $uri/ =404;``` to ```try_files $uri /index.html;```. The configuration file should be similar to the following:
```
server {
    listen 80;
    listen [::]:80;

    root /var/www/react/html;
    index index.html index.htm index.nginx-debian.html;

    server_name react [your_ipv6_address];

    location / {
            try_files $uri /index.html;
    }
}
```
5. Enable the configuration file by creating a link from it to the sites-enabled directory: ```sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/```

### Step 7: Copy build contents to website directory
1. Copy build contents into the directory you created in the step 4 (/var/www/react/html): ```sudo cp -r ~/[repository_name]/frontend/dist/* /var/www/react/html```
> - where repository_name is the name of the repository (e.g. f23project-talent-gift)

### Step 8: Access web app
1. Test that there are no syntax errors in any of your Nginx files: ```sudo nginx -t```
2. If there are no errors, restart Nginx to enable your changes: ```sudo systemctl restart nginx```
3. Enter your Linux instance’s IPv6 address into your browser’s search bar
If you have followed the steps above correctly, the app should be available at the IPv6 address of the Linux instance!

### References:
- https://www.digitalocean.com/community/tutorials/how-to-deploy-a-react-application-with-nginx-on-ubuntu-20-04#step-1-creating-a-react-project
- https://stackoverflow.com/questions/43555282/react-js-application-showing-404-not-found-in-nginx-server
- https://deb.nodesource.com/

## Backend
Before proceeding, ensure you have a Linux instance set up for the backend.

### Step 1: Clone the project GitHub Repository onto your Linux instance
1. In the repository page on GitHub, click Code. Select HTTPS and copy the repository url
2. In your Linux instance, run ```git clone [repository_url]``` where repository_url is the url you copied in the previous step

### Step 2: Install npm and Node.js
1. Refresh your server’s local package index: ```sudo apt update```
2. Run ```sudo apt install npm```
3. Run ```sudo apt install nodejs```
4. The version of Node.js installed in the previous step will not be the latest version (Ubuntu 22.04 supports Node.js version 12.22.9). You will need to run the following commands to update Node.js to the latest version:
```bash
sudo apt-get update && sudo apt-get install -y ca-certificates curl gnupg
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=20
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update && sudo apt-get install nodejs -y
```

### Step 3: Install dependencies
1. Navigate to the backend folder of the codebase
```bash
cd [repository_name]
cd backend
```
> - where repository_name is the name of the repository (e.g. f23project-talent-gift)
2. Install all dependencies required for the application to run: ```npm i```
3. Return to the root directory for the next step: ```cd ~```

### Step 4: Set up Nginx
Follow the steps outlined in the “Setting Up Nginx” section of the deployment instructions

### Step 5: Configure server for backend
1. Navigate to the sites-available directory: ```cd /etc/nginx/sites-available/```
2. Open the default configuration file: ```vim default```
3. Modify the configuration file so it matches the following:
```conf
server {
    listen 80;
    listen [::]:80;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    server_name _;

    location / {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
    }
}
```
4. Enable the configuration file by creating a link from it to the sites-enabled directory:
```sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/```

### Step 6: Save changes to Nginx files
1. Test that there are no syntax errors in any of your Nginx files: ```sudo nginx -t```
2. If there are no errors, restart Nginx to enable your changes: ```sudo systemctl restart nginx```

### Step 7: Set up pm2
pm2 is a process manager for Node.js applications that allows you to run your server in the background as a service. Ensure that you are in the root directory of the repository. You can type ```cd ~``` to navigate to the root directory.
1. Install pm2 by running the following command: ```sudo npm install pm2@latest -g```
2. Navigate to the backend directory: 
```bash
cd [repository_name]
cd backend
```
> - where repository_name is the name of the repository (e.g. f23project-talent-gift)
3. Start the Express server: ```pm2 start server.js```
> - You can type ```pm2 restart server.js``` to restart the server and ```pm2 stop server.js``` to stop the server

You have now successfully deployed a server for the API endpoints. The API endpoints retrieve data from a PostgreSQL database which will be set up in the next section.

### Step 8: Set hostname for application
You will need to set the hostname for the backend server in the application configuration file. Ensure that you are in the project directory.

1. Open the project configuration file: ```vim config.js```
2. Change the hostname to the IPv6 address of your backend Linux instance (include the square brackets).
```javascript
const config = {
  hostname: "[your_ipv6_address]",
};
```
3. Navigate to the backend directory: ```cd backend```
4. Navigate to the routes directory: ```cd routes```
5. Open links.js: ```vim config.js```
6. Change the hostname to the IPv6 address of your backend Linux instance (include the square brackets).
```javascript
const config = {
  hostname: "[your_ipv6_address]",
};
```

### References:
- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04
- https://gist.github.com/bradtraversy/cd90d1ed3c462fe3bddd11bf8953a896 
- https://deb.nodesource.com/

## PostgreSQL Database
Before proceeding, ensure that you are logged into your backend Linux instance.

### Step 1: Install PostgreSQL
1. Refresh your server’s local package index: ```sudo apt update```
2. Install the Postgres package: ```sudo apt install postgresql postgresql-contrib```
3. Ensure that the server is running: ```sudo systemctl start postgresql.service```

### Step 2: Navigate to PostgreSQL terminal
1. Switch to the ```postgres``` user on your Linux instance: ```sudo -i -u postgres```
2. Open the PostgreSQL terminal: ```psql```

### Step 3: Create PostgreSQL database
Ensure that you have the PostgreSQL terminal open on your Linux instance
1. Enter the following command to create a database for your application: ```sudo -u postgres createdb talentgift```

### Step 4: Add tables to database
Ensure that you have the PostgreSQL terminal open on your Linux instance 
1. Connect to the database you created in the previous step: ```\c talentgift```
2. Go to the application’s GitHub repository on your browser
3. Click on the backend directory
4. Click on the file named DBcreation.sql
5. Copy the contents of DBcreation.sql (use CTRL+A)
6. Paste the contents of DBcreation.sql into the PostgreSQL terminal and press Enter
7. Exit the PostgreSQL terminal and log out (press CTRL+D twice)

The PostgreSQL database should now be ready for the app to use.

### References: 
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04

## Set Up Nginx
You will need to set up Nginx on your Linux instance(s) to set up a server for the frontend and backend. 

### Step 1: Install Nginx
1. Run the following commands to install Nginx on your Linux instance:
```bash
sudo apt update
sudo apt install nginx
```

### Step 2: Adjust Firewall
It is recommended that you adjust your server’s firewall to restrict traffic while still allowing your users to access the application. You can restrict access to port 80 (HTTP) by typing: ```sudo ufw allow ‘Nginx HTTP’```. You can verify the change by typing: ```sudo ufw status```.

### Step 3: Checking the web server
Your Nginx server should be ready to go. You can check whether the Nginx server was set up properly by entering your IPv6 address into your browser’s search bar. You should receive the default Nginx landing page.


### Managing Nginx
- To stop your web server, type: ```sudo systemctl stop nginx```
- To start your web server when it is stopped, type: ```sudo systemctl start nginx```
- To stop and then start your web server again, type: ```sudo systemctl restart nginx```

### Set up Email
You will need to configure your email with the app to send notifications to employees. 
1. Sign into your Google account
2. Open this link: [https://myaccount.google.com/security](https://myaccount.google.com/security)
3. Enable 2FA (two factor authentication)
4. Click on App Passwords at the bottom of the Two-Factor Authentication screen.
5. From Select App options select Other and write your app name it could be any name like "Talent Gift". It will generate you the password copy the password from the popup and use the following code.
6. Use that copied password in the auth password section of the code
7. Navigate to the backend directory and go to links:
```bash
cd backend
cd links
```
8. Modify links.js in the following way:
```javascript
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: 'your-email', // put in your email to test this, will not work with new email 
    pass: 'your-app-password',
    tls:{
      rejectUnauthorized:false
    }
  }
});
```
> - where 'your-email' is the email account you set up 2FA on and 'your-app-password' is the password you copied from step 6

### References: 
- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04
- https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted
