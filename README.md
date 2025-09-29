# Login_page
 use react.js / node.js / postgre.sql  Build a screen for new user registration - First Name, Last , Phone # and email, password [to be used for login]

## Installation Guide

Follow these steps to get the project up and running locally.

### Prerequisites

Step 1: Open CMD

Press Win + R, type cmd, and press Enter.

```bash
Step 2: Check Node.js
node -v


✅ Example output:

```bash
v18.17.0


❌ If not installed, download from Node.js


Step 3: Check npm

```bash
npm -v


✅ Example output:

```bash
9.8.1


npm comes bundled with Node.js.

Step 4: Check Git (optional)

```bash
git --version


✅ Example output:

```bash
git version 2.41.0


❌ If missing, install from Git


Step 5: Check PostgreSQL

```bash
psql --version


✅ Example output:

```bash
psql (PostgreSQL) 16.2


❌ If PostgreSQL is not installed:

Download from PostgreSQL Downloads

Install and remember the username (usually postgres) and password you set during installation.

Make sure to select “Add PostgreSQL to PATH” during installation, so psql works in CMD.

Optional: Test PostgreSQL connection

```bash
psql -U postgres -W


-U postgres → username

-W → prompts for password

If you can log in → ✅ PostgreSQL is working.

Step 6: Quick Full Check in CMD

You can check all prerequisites at once:

```bash
node -v
npm -v
git --version
psql --version


If all commands return versions → ✅ System is ready.

If any command fails → ❌ Install the missing software.


### Steps

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

2. **Configure environment variables**
Create a .env file in the root directory and add the necessary variables:

example .env :
# Database config
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=yourpassowrd
DB_PORT=5432

# Backend URL (adjust port if needed)
BACKEND_URL=http://localhost:8080
BACKEND_PORT=8080

REACT_APP_BACKEND_URL=http://localhost:8080


3.  **Install Dependencies**

Run the following commands:

```bash
npm install --save-dev npm-run-all
npm run dev:install

4. **Run the development server**


```bash
npm run dev:backend

open another command prompt

```bash
npm run start:frontend  




