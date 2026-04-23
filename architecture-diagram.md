# Software Architecture Diagram

## Component Diagram

```mermaid
graph TB
    subgraph Client
        HTTP[HTTP Requests]
    end

    subgraph Server["Express Server :3800"]
        subgraph Middleware
            BP[body-parser<br/>JSON/urlencoded]
            MP[multipart<br/>file upload]
        end

        subgraph Routes["Routes /api"]
            AR[articleroutes.js]
        end

        subgraph Controller
            AC[articlecontroller.js]
        end
    end

    subgraph Data["Data Layer"]
        M[(Article Model<br/>Mongoose Schema)]
        DB[(MongoDB)]
    end

    subgraph Storage["File Storage"]
        UP[./upload/articles]
    end

    HTTP --> Middleware
    BP --> Routes
    MP --> Routes
    Routes --> AC
    AC --> M
    M --> DB
    AC --> UP

    style HTTP fill:#e1f5fe
    style DB fill:#c8e6c9
    style UP fill:#fff3e0
```

## API Routes

```mermaid
graph LR
    A[Client] -->|GET /api/probando| B[probando]
    A -->|POST /api/probando| B
    A -->|GET /api/test-de-controlador| C[test]
    A -->|POST /api/save| D[save]
    A -->|GET /api/articles| E[getArticles]
    A -->|GET /api/article/:id| F[getArticle]
    A -->|PUT /api/article/:id| G[update]
    A -->|DELETE /api/article/:id| H[delete]
    A -->|POST /api/upload-image| I[upload]
    A -->|POST /api/upload-image/:id| I
    A -->|GET /api/get-image/:image| J[getImage]
    A -->|GET /api/search/:search| K[search]

    B:::action
    C:::action
    D:::action
    E:::action
    F:::action
    G:::action
    H:::action
    I:::action
    J:::action
    K:::action

    classDef action fill:#bbdefb
```

## Data Flow

```mermaid
sequenceDiagram
    participant Client
    participant Express
    participant Middleware
    participant Router
    participant Controller
    participant Model
    participant MongoDB

    Client->>Express: HTTP Request
    Express->>Middleware: Parse request
    Middleware->>Router: Route request
    Router->>Controller: Call action
    Controller->>Model: Database operation
    Model->>MongoDB: CRUD
    MongoDB-->>Model: Result
    Model-->>Controller: Data
    Controller-->>Express: Response
    Express-->>Client: JSON Response
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Framework | Express.js v5.2.1 |
| Database | MongoDB + Mongoose v9.4.1 |
| Middleware | body-parser v2.2.2, connect-multiparty v2.2.0 |
| Validation | validator v13.15.35 |

## Directory Structure

```
Backend/
├── index.js                  # Entry point
├── app.js                    # Express configuration
├── controllers/
│   └── articlecontroller.js  # Business logic
├── routes/
│   └── articleroutes.js      # API routes
├── models/
│   └── article.js            # Mongoose schema
└── upload/
    └── articles/             # File uploads
```
