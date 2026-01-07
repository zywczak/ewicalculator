# Preparing

1. In file src/api/axiosApi.tsx address 
  ```const BASE_API_URL = "https://api-veen-e-test.ewipro.com";```
  works for login, if you want more information in app about projects, subcontractors after login delete 
  ```-test```
   
# Local deployment

In order to deploy application on local environment follow the steps below:

1. Install nodejs on your computer
   ```https://nodejs.org/en```
  , if you don't have it

2. Clone repository
    ```git clone https://github.com/zywczak/installer-portal.ewipro.git```

3. ```cd installer-portal.ewipro```

4. Everytime you pull the newest version of code run ```npm install```

5. Run ```npx vite```

6. ```npx vite build``` use if you want local form-widget (this create ```dist``` folder)