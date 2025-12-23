# vw-api (MAMP)

## How to run in MAMP
1. Install Composer on your Mac.
2. Extract this zip into MAMP htdocs folder.
3. Open terminal inside the folder.
4. Run:
   composer create-project laravel/laravel .
5. Copy files from this package into the created project (overwrite).
6. Configure .env with MAMP MySQL credentials.
7. Run:
   php artisan serve

API:
GET /api/projects
Header:
Authorization: {api_token}
