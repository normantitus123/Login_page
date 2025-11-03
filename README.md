# Login_page
 use react.js / node.js / postgre.sql  Build a screen for new user registration - First Name, Last , Phone # and email, password [to be used for login]

## Installation Guide

Follow these steps to get the project up and running locally.

### Prerequisites

Step 1: Clone the repository

In Cmd 
```
git clone https://github.com/normantitus123/Login_page
cd Login_page
```
Open the above project in vs code
create a Cmd terminal in vs code

Step 2: Quick Full Check in CMD

You can check all prerequisites at once:

```
node -v
npm -v
git --version
psql --version
```

If all commands return versions → ✅ System is ready And proced to steps.

If any command fails → ❌ Continue  Install the missing software.

Step 3: Node.js

✅ Example output:

```
v18.17.0
```

❌ If not installed, download from [Node.js](https://nodejs.org/en/download/)


Step 4:npm

✅ Example output:

```
9.8.1
```

npm comes bundled with Node.js.

Step 5: Git (optional)

✅ Example output:

```
git version 2.41.0
```

❌ If missing, install from [Git](https://git-scm.com/downloads)


Step 6: PostgreSQL

✅ Example output:

```
psql (PostgreSQL) 16.2
```

❌ If PostgreSQL is not installed:

Download from [PostgreSQL](https://www.postgresql.org/download/)

Install and remember the username (usually postgres) and password you set during installation.

Make sure to select “Add PostgreSQL to PATH” during installation, so psql works in CMD.

Optional: Test PostgreSQL connection

```
psql -U postgres -W
```

-U postgres → username

-W → prompts for password

If you can log in → ✅ PostgreSQL is working.


#### Steps

1. **Configure environment variables**
Create a .env file in the root directory and add the necessary variables:

example .env :
```
# Database config
DB_PASSWORD=yourpassowrd

JWT_SECRET=randonsecretkey
```

2.  **Install Dependencies**

Run the following commands:

```cmd
npm install --save-dev npm-run-all
npm run dev:install
```

3. **Run the development server**


```
npm run dev:backend
```

open another command prompt

```
npm run start:frontend  
```

##### How to Update the Project

You can update the project in two ways — depending on how you downloaded it.


---

🔹 Method 1: Using git clone (recommended)

If you cloned the repository with Git:

```
cd path/to/projects
git pull origin main
```

This will pull the latest changes from the main branch.


---

🔹 Method 2: Using the ZIP download (from the GitHub page)

If you downloaded the project as a ZIP file:

```
cd path/to/unzipped_folder
git init
git remote add origin https://github.com/normantitus123/Login_page
git fetch origin
git checkout -b main origin/main
```