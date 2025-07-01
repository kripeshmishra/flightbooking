'use client'
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const SignInPage = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (!(status === "loading") && !session) void signIn("github");
        if (session) window.close();
    }, [session, status]);

    if (status === 'loading') {
        return (
            <>
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        background: "#fff",
                        zIndex: 9999999
                    }}
                ></div>
            </>
        );
    }
    if (status === 'unauthenticated') {
        return (
            <>
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        background: "#fff",
                        zIndex: 9999999
                    }}
                ></div>
            </>
        );
    }
    if (status === 'authenticated') {
        return (
            <>
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        background: "#fff",
                        zIndex: 9999999
                    }}
                ></div>
            </>
        );
    }
};

export default SignInPage;