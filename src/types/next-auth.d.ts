import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        xId?: string;
        isSocialPicture?: boolean;
        lastAccess?: string;
    }
    interface Session {
        user: {
            xId?: string;
            isSocialPicture?: boolean;
            lastAccess?: string;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        xId?: string;
        isSocialPicture?: boolean;
        lastAccess?: string;
    }
    interface Profile {
        xId?: string;
        isSocialPicture?: boolean;
        lastAccess?: string;
    }
}