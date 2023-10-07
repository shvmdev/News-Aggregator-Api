# news-aggregator-api

RESTful API that allows users to fetch news articles from multiple sources based on their preferences.

README for API:

## News API

The News API is a RESTful service that allows users to register, log in, manage news preferences, and fetch news articles based on those preferences. This API provides a convenient way for users to stay up-to-date with the latest news that aligns with their interests.

## Authentication

Authentication is required for certain endpoints to ensure the security and privacy of user data. The API uses token-based authentication. To authenticate, include an `Authorization` header in your request with a valid token.

Example:

```
Authorization: Bearer <token>
```

## Endpoints

### Register a new user

**Endpoint:**

```
POST /register
```

This endpoint allows you to register a new user by providing the necessary user details.

**Request:**

```
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "mysecretpassword"
}
```

**Response:**

```
HTTP/1.1 201 Created
Content-Type: application/json

{
  "message": "User registered successfully"
}
```

### Log in a user

**Endpoint:**

```
POST /login
```

This endpoint allows users to log in by providing their email and password.

**Request:**

```
POST /login
Content-Type: application/json

{
  "email": "johndoe@example.com",
  "password": "mysecretpassword"
}
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "token": "<token>"
}
```

### Retrieve news preferences

**Endpoint:**

```
GET /preferences
```

This endpoint retrieves the news preferences for the logged-in user.

**Request:**

```
GET /preferences
Authorization: Bearer <token>
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "preferences": ["technology", "business"],
}
```

### Update news preferences

**Endpoint:**

```
PUT /preferences
```

This endpoint allows the logged-in user to update their news preferences.

**Request:**

```
PUT /preferences
Authorization: Bearer <token>
Content-Type: application/json

{
  "preferences": "technology,business",
}
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "News preferences updated successfully"
}
```

### Fetch news articles

**Endpoint:**

```
GET /news
```

This endpoint fetches news articles based on the logged-in user's preferences.

**Request:**

```
GET /news
Authorization: Bearer <token>
```

**Response:**

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "articles": [
    {
      "title": "Breaking News",
      "description": "This is a breaking news article.",
      "source": "CNN"
    },
    {
      "title": "Technology News",
      "description": "This is a technology news article.",
      "source": "TechCrunch"
    }
  ]
}
```

## Conclusion

The News API provides a straightforward and convenient way to register users, manage their news preferences, and fetch relevant news articles. By following the provided endpoints and their respective request/response formats, you can easily integrate this API into your application and enhance your users' news reading experience.
