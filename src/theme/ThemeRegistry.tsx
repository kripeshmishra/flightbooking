"use client"
import React, { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "./EmotionCache";
import { FiCheck } from "react-icons/fi";
import { SessionProvider } from 'next-auth/react';
import { PaymentProvider } from "@/components/context/PaymentPageContext";

const Colors = {
    primary: "#00BDBB",
    secondary: "#003053",
    success: "#0F9E51",
    info: "#7A35FE",
    danger: "#FF3F72",
    light: "#F8F5FF",
    white: "#FFFFFF;",
    black: "#000000",
    dark: "#0B0323",
    orange: '#F27502',
    lightBlack: '#676977',
    lightPrimary: '#F0F9F8',
};


const themeOptions: ThemeOptions = {
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
        success: {
            main: Colors.success,
        },
        info: {
            main: Colors.info,
        },
        error: {
            main: Colors.danger,
        },
    },
    typography: {
        /** @type {import("@mui/material").SxProps} */

        fontFamily: "'Barlow', sans-serif",
        h1: {
            fontSize: "2rem",
            lineHeight: '1.2',
            color: Colors.black,
            fontWeight: "700",
            fontFamily: "'Poppins', sans-serif"
        },
        h2: {
            fontSize: "1.8rem",
            color: Colors.black,
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
        },
        h3: {
            fontSize: "1.2rem",
            textTransform: "capitalize",
            color: Colors.black,
            fontWeight: "600",
            fontFamily: "'Poppins', sans-serif",
        },
        h4: {
            fontSize: "1rem",
            fontWeight: "600",
            color: Colors.black,
            fontFamily: "'Poppins', sans-serif",
        },
        h5: {
            fontSize: "16px",
            fontWeight: "600",
            color: Colors.black,
            fontFamily: "'Poppins', sans-serif",
        },
        h6: {
            fontSize: "16px",
            fontWeight: "500",
            color: Colors.black,
            fontFamily: "'Poppins', sans-serif",
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained", color: "primary" },
                    style: {
                        fontSize: "1rem",
                        background: Colors.primary,
                        fontWeight: "500",
                        boxShadow: "none",
                        color: Colors.white,
                        border: '0',
                        borderRadius: "50px",
                        paddingLeft: "20px",
                        height: '38px',
                        paddingRight: "20px",
                        fontFamily: "'Barlow', sans-serif",
                        "&:hover": {
                            background: Colors.secondary,
                            boxShadow: "none",
                            color: Colors.white,
                        },
                        "@media screen and (max-width:1024px)": {
                            fontSize: '14px'
                        }
                    },
                },
                {
                    props: { variant: "contained", color: "secondary" },
                    style: {
                        fontSize: "1rem",
                        background: Colors.secondary,
                        fontWeight: "500",
                        boxShadow: "none",
                        color: Colors.white,
                        border: '0',
                        borderRadius: "50px",
                        paddingLeft: "20px",
                        height: '38px',
                        paddingRight: "20px",
                        fontFamily: "'Barlow', sans-serif",
                        "&:hover": {
                            background: Colors.primary,
                            boxShadow: "none",
                        },
                        "@media screen and (max-width:1024px)": {
                            fontSize: '14px'
                        }
                    },
                },
                {
                    props: { variant: "outlined", color: "primary" },
                    style: {
                        fontSize: "1rem",
                        background: 'transparent',
                        fontWeight: "500",
                        boxShadow: "none",
                        color: Colors.primary,
                        border: '1px solid',
                        borderColor: Colors.primary,
                        borderRadius: "50px",
                        paddingLeft: "20px",
                        height: '36px',
                        paddingRight: "20px",
                        fontFamily: "'Barlow', sans-serif",
                        lineHeight: 1,
                        "&:hover": {
                            background: Colors.primary,
                            boxShadow: "none",
                            color: Colors.white,
                            borderColor: Colors.primary,
                        },
                    },
                },
                {
                    props: { variant: "outlined", color: "secondary" },
                    style: {
                        fontSize: "1rem",
                        background: 'transparent',
                        fontWeight: "500",
                        boxShadow: "none",
                        color: Colors.secondary,
                        border: '1px solid',
                        borderColor: Colors.secondary,
                        borderRadius: "50px",
                        paddingLeft: "20px",
                        height: '36px',
                        paddingRight: "20px",
                        fontFamily: "'Barlow', sans-serif",
                        "&:hover": {
                            background: Colors.secondary,
                            boxShadow: "none",
                            color: Colors.white,
                            borderColor: Colors.secondary,
                        },
                    },
                },
            ],
        },

        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontFamily: "'Barlow', sans-serif",
                    color: Colors.lightBlack,
                    overflowX: 'hidden',
                    boxSizing: 'border-box',
                    letterSpacing: '0',
                    padding: '0',
                    fontSize: '1rem',
                    backgroundColor: '#F0F9F8',
                    scrollbarColor: "#EFEFEF #EFEFEF",
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    padding: '0'
                },
            },
            // defaultProps: {
            //     icon: <span className="uncheckedWrapper"></span>,
            //     checkedIcon: <span className="checkedWrapper"><FiCheck /></span>
            // }
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    padding: "0",
                    borderRadius: "50px",
                    height: '100%',
                    background: '#fff',
                    "& .MuiInputBase-root": {
                        border: "1px solid #E7E7E7",
                        fontSize: "1rem",
                        fontWeight: "500",
                        outline: "none",
                        boxShadow: "none",
                        color: Colors.lightBlack,
                        borderRadius: "50px",
                        fontFamily: "'Barlow', sans-serif",
                        height: '40px',
                        "&::placeholder": {
                            color: Colors.lightBlack,
                            opacity: "1",
                        },
                    },
                    "& .MuiOutlinedInput-input": {
                        "&::placeholder": {
                            fontFamily: "'Barlow', sans-serif",
                            color: Colors.lightBlack,
                            opacity: "1",
                        },
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "1rem",
                        color: Colors.lightBlack,
                        fontWeight: "400",
                        padding: "0 15px",
                        height: '100% !important',
                        boxSizing: 'border-box',
                        "&::placeholder": {
                            color: Colors.lightBlack,
                            fontFamily: "'Barlow', sans-serif",
                            opacity: "1",
                        },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                    "& .MuiInputLabel-root": {
                        fontSize: "12px",
                    },
                    "& .MuiInputBase-multiline": {
                        height: '100%',
                        padding: '0',
                        borderRadius: "6px",
                    }
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    padding: "0",
                    borderRadius: "6px",
                    background: '#fff',
                    height: '40px',
                    boxShadow: "none",
                    lineHeight: '1.2',
                    "& .MuiSelect-select": {
                        fontSize: "1rem",
                        fontWeight: "400",
                        outline: "none",
                        color: Colors.lightBlack,
                        fontFamily: "'Barlow', sans-serif",
                        padding: "0 12px",
                        height: '100% !important',
                        display: 'flex',
                        alignItems: 'center',
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#094067 !important'
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderWidth: '1px !important',
                        borderColor: '#094067 !important'
                    },
                    "& .MuiSelect-icon": {
                        color: Colors.lightBlack,
                    },
                },
            },
        },
        MuiList: {
            styleOverrides: {
                root: {
                    paddingTop: '0',
                    paddingBottom: '0',
                    "& .MuiMenuItem-root": {
                        fontSize: '14px',
                        "& a": {
                            color: Colors.lightBlack,
                        }
                    }
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: "12px !important",
                    fontWeight: '400 !important',
                    color: '#ff0000',
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: Colors.white,
                    borderRadius: "6px",
                    boxShadow: "0px 0px 15px 5px #042F7112",
                    padding: "0",
                    color: Colors.lightBlack,
                    "@media screen and (max-width:767px)": {
                        boxShadow: "0px 10px 15px 5px #0a4eb712",
                    }
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: Colors.primary,
                    textDecoration: 'none',
                    cursor: 'pointer',
                    "&:hover": {
                        color: Colors.secondary,
                    }
                },
            },
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    "& .MuiAlert-standard , & .MuiAlert-standardSuccess": {
                        backgroundColor: '#0F9E51',
                        padding: '3px 15px',
                        color: '#fff',
                        "& .MuiAlert-icon": {
                            color: '#fff',
                            marginRight: '10px',
                        }
                    },
                    "& .MuiAlert-standardError": {
                        backgroundColor: '#ff5252',
                        padding: '3px 15px',
                        color: '#fff',
                        "& .MuiAlert-icon": {
                            color: '#fff',
                            marginRight: '10px',
                        }
                    }
                }
            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 767,
            md: 991,
            lg: 1200,
            xl: 1536,
        },
    },

}

const theme = createTheme(themeOptions);



export default function ThemeRegistry({ children }: { children: ReactNode; }) {
    return (
        <>
            <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
                <SessionProvider>
                    <PaymentProvider>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            {children}
                        </ThemeProvider>
                    </PaymentProvider>
                </SessionProvider>
            </NextAppDirEmotionCacheProvider>
        </>
    );
}