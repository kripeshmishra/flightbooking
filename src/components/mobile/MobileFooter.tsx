import { Box } from '@mui/material'
import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaGooglePlusG } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MobileFooter = () => {
    return (
        <Box className="footer-social-sec">
            <ul className="socialMediaLinks">
                <li>
                    <a target="_blank" href="#">
                        <FaFacebookF />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="/">
                        <FaGooglePlusG style={{ fontSize: "20px" }} />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="/">
                        <FaXTwitter />
                    </a>
                </li>
                <li>
                    <a target="_blank" href="/">
                        <FaLinkedinIn />
                    </a>
                </li>
            </ul>
        </Box>
    )
}

export default MobileFooter