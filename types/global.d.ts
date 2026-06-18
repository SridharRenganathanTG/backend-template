declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string | null;
        phone: string | null;
        name: string | null;
      };
    }
  }
  namespace NodeJS {
    interface Process extends Omit<import("node:process").Process, "env"> {
      env: import("zod").infer<typeof import("./config/env").envSchema>;
    }
  }
}
export {};
