import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GitHubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { SignUpSource } from "@/utilty/Enums";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            async profile(profile: any, tokens: any) {
                const resp = await fetch(`${process.env.BASE_URL}/ac/usu`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Email: profile?.email, Name: profile?.name, SignupSource: SignUpSource.GOOGLE })
                })

                const userObj: any = await resp.json();
                if (userObj?.isSuccess) {
                    let profilePic = userObj.model.isSocialPicture ? profile?.picture : userObj.model.picture;
                    return {
                        id: profile?.sub,
                        name: userObj.model.name,
                        email: profile.email,
                        image: profilePic,
                        xId: userObj.model.xId,
                        isSocialPicture: userObj.model.isSocialPicture,
                        lastAccess: userObj.model.lastAccess
                    };
                }
                return profile;
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID as string,
            clientSecret: process.env.FACEBOOK_SECRET as string,
            async profile(profile: any, tokens: any) {
                const resp = await fetch(`${process.env.BASE_URL}/ac/usu`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Email: profile.email, Name: profile.name, SignupSource: SignUpSource.FACEBOOK, })
                })
                const userObj: any = await resp.json();
                if (userObj?.isSuccess) {
                    let profilePic = userObj.model.isSocialPicture ? profile.picture.data.url : userObj.model.picture;
                    return {
                        id: profile.id,
                        name: userObj.model.name,
                        email: profile.email,
                        image: profilePic,
                        xId: userObj.model.xId,
                        isSocialPicture: userObj.model.isSocialPicture,
                        lastAccess: userObj.model.lastAccess
                    };
                }
                return profile;
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            async profile(profile: any, tokens: any) {
                const resp = await fetch(`${process.env.BASE_URL}/ac/usu`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ Email: profile.email, Name: profile?.name ? profile.name : profile.login, SignupSource: SignUpSource.GITHUB })
                })
                const userObj: any = await resp.json();
                if (userObj?.isSuccess) {
                    let profilePic = userObj.model.isSocialPicture ? profile.avatar_url : userObj.model.picture;
                    return {
                        id: profile.id,
                        name: userObj.model.name,
                        email: profile.email,
                        image: profilePic,
                        xId: userObj.model.xId,
                        isSocialPicture: userObj.model.isSocialPicture,
                        lastAccess: userObj.model.lastAccess
                    };
                }
                return profile;
            }
        })
    ],
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 30,
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                return {
                    ...token,
                    xId: user?.xId,
                    isSocialPicture: user?.isSocialPicture,
                    lastAccess: user?.lastAccess
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    xId: token?.xId,
                    isSocialPicture: token?.isSocialPicture,
                    lastAccess: token?.lastAccess
                }
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    logger: {
        error(code, metadata) {
            console.log("errorr - code = " + JSON.stringify(code));
            console.log("errorr - metadata = " + JSON.stringify(metadata));
        },
        warn(code) {
            console.log("" + code);
        },
        debug(code, metadata) {
            console.log("" + JSON.stringify(code));
            console.log("" + JSON.stringify(metadata));
        }
    }
}; 