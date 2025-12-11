import { createServer, Response } from "miragejs";

// Types for our data
interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "admin" | "hr" | "manager" | "employee";
  department: string;
  designation: string;
  status: "active" | "inactive" | "on_leave";
  joinDate: string;
  phoneNumber?: string;
  avatar?: string;
}

interface StoredToken {
  userId: string;
  refreshToken: string;
  expiresAt: number;
}

// Hardcoded credentials for demo
const DEMO_CREDENTIALS = {
  email: "admin@pulseops.com",
  password: "Admin@123",
};

// In-memory storage for tokens
const tokenStore: StoredToken[] = [];

// Demo users database
const usersDb: User[] = [
  {
    id: "1",
    email: DEMO_CREDENTIALS.email,
    password: DEMO_CREDENTIALS.password,
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    department: "Management",
    designation: "System Administrator",
    status: "active",
    joinDate: "2023-01-01",
    phoneNumber: "+1 234 567 8900",
  },
  {
    id: "2",
    email: "john.doe@pulseops.com",
    password: "John@123",
    firstName: "John",
    lastName: "Doe",
    role: "employee",
    department: "Engineering",
    designation: "Senior Developer",
    status: "active",
    joinDate: "2023-03-15",
    phoneNumber: "+1 234 567 8901",
  },
  {
    id: "3",
    email: "jane.smith@pulseops.com",
    password: "Jane@123",
    firstName: "Jane",
    lastName: "Smith",
    role: "hr",
    department: "Human Resources",
    designation: "HR Manager",
    status: "active",
    joinDate: "2023-02-20",
    phoneNumber: "+1 234 567 8902",
  },
];

// JWT-like token generation (simplified for mock)
const generateToken = (userId: string, type: "access" | "refresh"): string => {
  const payload = {
    userId,
    type,
    exp:
      type === "access"
        ? Date.now() + 15 * 60 * 1000 // 15 minutes
        : Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    iat: Date.now(),
  };
  return btoa(JSON.stringify(payload));
};

const decodeToken = (
  token: string,
): { userId: string; type: string; exp: number } | null => {
  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  return decoded.exp < Date.now();
};

// Helper to get user without password
const sanitizeUser = (user: User): Omit<User, "password"> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userData } = user;
  return userData;
};

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = "api";
      this.timing = 500; // Simulate network delay

      // Login endpoint
      this.post("/auth/login", (_schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = usersDb.find((u) => u.email === email);

        if (!user || user.password !== password) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "INVALID_CREDENTIALS",
                message: "Invalid email or password",
              },
            },
          );
        }

        const accessToken = generateToken(user.id, "access");
        const refreshToken = generateToken(user.id, "refresh");

        // Store refresh token
        tokenStore.push({
          userId: user.id,
          refreshToken,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        });

        return {
          success: true,
          data: {
            user: sanitizeUser(user),
            accessToken,
            refreshToken,
          },
        };
      });

      // Refresh token endpoint
      this.post("/auth/refresh", (_schema, request) => {
        const { refreshToken } = JSON.parse(request.requestBody);

        if (!refreshToken || isTokenExpired(refreshToken)) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "INVALID_REFRESH_TOKEN",
                message: "Invalid or expired refresh token",
              },
            },
          );
        }

        const decoded = decodeToken(refreshToken);
        if (!decoded) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "INVALID_TOKEN",
                message: "Invalid token format",
              },
            },
          );
        }

        const storedTokenIndex = tokenStore.findIndex(
          (t) => t.refreshToken === refreshToken,
        );
        if (storedTokenIndex === -1) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "TOKEN_NOT_FOUND",
                message: "Refresh token not found",
              },
            },
          );
        }

        const user = usersDb.find((u) => u.id === decoded.userId);
        if (!user) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "USER_NOT_FOUND",
                message: "User not found",
              },
            },
          );
        }

        // Generate new tokens
        const newAccessToken = generateToken(user.id, "access");
        const newRefreshToken = generateToken(user.id, "refresh");

        // Update stored refresh token
        tokenStore[storedTokenIndex] = {
          userId: user.id,
          refreshToken: newRefreshToken,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        };

        return {
          success: true,
          data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          },
        };
      });

      // Logout endpoint
      this.post("/auth/logout", (_schema, request) => {
        const authHeader = request.requestHeaders.Authorization;
        if (authHeader) {
          const token = authHeader.replace("Bearer ", "");
          const decoded = decodeToken(token);
          if (decoded) {
            const index = tokenStore.findIndex(
              (t) => t.userId === decoded.userId,
            );
            if (index !== -1) {
              tokenStore.splice(index, 1);
            }
          }
        }

        return {
          success: true,
          data: {
            message: "Logged out successfully",
          },
        };
      });

      // Get current user endpoint
      this.get("/auth/me", (_schema, request) => {
        const authHeader = request.requestHeaders.Authorization;
        if (!authHeader) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "UNAUTHORIZED",
                message: "No authorization token provided",
              },
            },
          );
        }

        const token = authHeader.replace("Bearer ", "");
        if (isTokenExpired(token)) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "TOKEN_EXPIRED",
                message: "Access token has expired",
              },
            },
          );
        }

        const decoded = decodeToken(token);
        if (!decoded) {
          return new Response(
            401,
            {},
            {
              success: false,
              error: {
                code: "INVALID_TOKEN",
                message: "Invalid token format",
              },
            },
          );
        }

        const user = usersDb.find((u) => u.id === decoded.userId);
        if (!user) {
          return new Response(
            404,
            {},
            {
              success: false,
              error: {
                code: "USER_NOT_FOUND",
                message: "User not found",
              },
            },
          );
        }

        return {
          success: true,
          data: {
            user: sanitizeUser(user),
          },
        };
      });

      // Get all users (for admin)
      this.get("/users", () => {
        const usersData = usersDb.map(sanitizeUser);

        return {
          success: true,
          data: {
            users: usersData,
            total: usersData.length,
          },
        };
      });

      // Get user by ID
      this.get("/users/:id", (_schema, request) => {
        const user = usersDb.find((u) => u.id === request.params.id);
        if (!user) {
          return new Response(
            404,
            {},
            {
              success: false,
              error: {
                code: "USER_NOT_FOUND",
                message: "User not found",
              },
            },
          );
        }

        return {
          success: true,
          data: {
            user: sanitizeUser(user),
          },
        };
      });

      // Passthrough any other requests
      this.passthrough();
    },
  });
}
