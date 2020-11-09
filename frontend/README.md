# Ecommerce Platform Frontend

## Getting Started

Create and `.env` file based on `env.sample` and add the corresponding values for each variable

### Creating and copying the Google client credentials

We can create a new **Google OAuth Client** and copy the credentials (Client ID and Client Secret) in your .env file.

- Create a new OAuth client ID.
- Choose Web application as the Application Type.
- Add the following Authorized redirect URIs:

```
http://localhost:3000/api/auth/callback/google
http://localhost:1337/connect/google/callback
```
