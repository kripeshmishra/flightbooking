"use client"
import React, { useEffect, useState } from 'react'
import { Avatar, Box, Container, Grid, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import { FaFacebookF, FaLinkedinIn, FaGooglePlusG } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { GrMap } from "react-icons/gr";
import Image from 'next/image';
import Link from 'next/link';
import { FiPhone } from 'react-icons/fi';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import '../../public/css/footer.css'

const Footer = () => {



  const mapUrl = 'https://www.google.com/maps?q=Phase+8,Mohali,India';

  return (
    <>


      <>

        <Box className='footerSection'>
          <Container maxWidth="lg">
            <>
              <Stack className="footerTop" direction='row' alignItems='center' justifyContent='space-between'>
                <Box className="footerLogo">
                  <Link href="/">
                    <Image alt="Fly States" src="/images/logo-footer.svg" fill sizes="auto" />
                  </Link>
                </Box>
                <Stack direction="row" justifyContent='center' gap={2} alignItems='center'>
                  <Image src="/images/master-card.png" alt='arc' width={44.63} height={28} />
                  <Image src="/images/visa-card.png" alt='arc' width={44.63} height={28} />
                  <Image src="/images/visa-electron.png" alt='arc' width={44.63} height={28} />
                  <Image src="/images/discover.png" alt='arc' width={44.63} height={28} />
                  <Image src="/images/ameriacan-express.png" alt='arc' width={44.63} height={28} />
                </Stack>

              </Stack>
              <Box className="footerMiddle mt-10">
                <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Box className="footer_grid">
                    <Typography component="h3" variant="h3">
                      Legal
                    </Typography>
                    <ul className="footerlistitems">
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt />  About Us
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt />  Cancellation and Refund
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> Disclaimer
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt />  Privacy Policy
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt />  Terms and Conditions
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                  <Box className="footer_grid">
                    <Typography component="h3" variant="h3">
                      Top Airlines
                    </Typography>
                    <ul className="footerlistitems">
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt />Air Serbia
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> Ita Airlines
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> Neosair
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> Sky Express
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt />Tarom
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                  <Box className="footer_grid">
                    <Typography component="h3" variant="h3">
                      Top Destinations
                    </Typography>
                    <ul className="footerlistitems">
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> Rio
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> Tokyo
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> Vancouver
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> New York
                        </Typography>
                      </li>
                      <li>
                        <Typography component={Link} href="/">
                          <BiSolidPlaneAlt /> San Francisco
                        </Typography>
                      </li>
                    </ul>
                  </Box>
                  <Box className="footer_grid">
                    <Typography component="h3" variant="h3">
                      Need any help?
                    </Typography>
                    <List className='needAnyHelpList'>
                      <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemAvatar>
                          <Avatar >
                            <FiPhone />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Call us"
                          secondary={
                            <Link href="tel:+11234560606" color="inherit">
                              +1 123-456-0606
                            </Link>
                          } />
                      </ListItem>
                      <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemAvatar>
                          <Avatar >
                            <FaRegEnvelopeOpen />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Write to us"
                          secondary={
                            <Link href="mailto:info@flystates.com" color="inherit">
                              info@flystates.com
                            </Link>
                          }
                        />
                      </ListItem>
                      <ListItem disablePadding sx={{ mb: 1 }}>
                        <ListItemAvatar>
                          <Avatar >
                            <GrMap />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Address"
                          secondary={
                            <Link href={mapUrl} target="_blank" rel="noopener noreferrer" color="inherit">
                              Phase 8, Mohali, India
                            </Link>
                          } />
                      </ListItem>
                    </List>
                  </Box>
                </Box>
              </Box>
            </>

            <Box className="footerSecureSection text-center pb-6 pt-8">
              <Stack direction="row" justifyContent='center' gap={2} alignItems='center' className='mb-4'>
                <Box className="footerSecureItem">
                  <Image src="/images/arc.png" alt='arc' fill className='object-scale-down' sizes='auto' />
                </Box>
                <Box className="footerSecureItem">
                  <Image src="/images/asta.png" alt='arc' fill className='object-scale-down' sizes='auto' />
                </Box>
                <Box className="footerSecureItem">
                  <Image src="/images/clia.png" alt='arc' fill className='object-scale-down' sizes='auto' />
                </Box>
                <Box className="footerSecureItem">
                  <Image src="/images/trustedSite.png" alt='arc' fill className='object-scale-down' sizes='auto' />
                </Box>
                <Box className="footerSecureItem">
                  <Image src="/images/combosecure.png" alt='arc' fill className='object-scale-down' sizes='auto' />
                </Box>
              </Stack>
              <Typography>
                FLYSTATES is a registered affiliate DBA of SAVI WORLD TRAVELS LLC in the state of Connecticut. We adhere to, by all means, the operational standards mentioned in the ARC Verified Travel Consultant agreement. Our Operations Centres are open 24 hours Monday through Sunday. Travelslake being a DBA is authorized to use the ARC# 07619743 of SAVI WORLD TRAVELS LLC.
              </Typography>
            </Box>
          </Container>
          <Box className="footerBottom">
            <Container maxWidth="lg">
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography className="footer-tagline">Copyright © 2013-{new Date().getFullYear()}</Typography>
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
              </Stack>
            </Container>
          </Box>
        </Box>
      </>
    </>
  )
}

export default Footer