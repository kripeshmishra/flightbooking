"use client"
import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { Box, Container, Grid, Typography, Stack, TextField, Fade, Alert, Button, Divider, FormControlLabel, Checkbox } from '@mui/material'
import Image from 'next/image'
import { LoadingButton } from '@mui/lab'
import { FiSend, FiX } from 'react-icons/fi'

const Newsletter = () => {

    const { control, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [respObj, setRespObj] = useState<any>(null);


    const handleCloseAlert = () => {
        clearErrors('email')
    };


    const onSubmit = async (data: any) => {
        if (!data.email) {
            setRespObj({
                isSuccess: false,
            });

        } else {
            console.log(data)
        }
        setTimeout(() => {
            setRespObj(null);
        }, 6000);

    };



    return (
        <>
            <Container maxWidth='lg'>
                <Box className='bg-secondary newsletter-section rounded-2xl relative px-5 py-8' sx={{ backgroundImage: "url('/images/circle-shape-right.svg'), url('/images/circle-shape-left.svg')" }}>
                    <Stack direction={{ md: 'row' }} gap={2} alignItems='center' justifyContent='center' className='newsletter-contentWrapper'>
                        <Box className='icon-newsletter'>
                            <Image src='/images/email.svg' alt='newsletter' width={170} height={170} />
                        </Box>
                        <Divider orientation="vertical" variant="middle" />
                        <Box>
                            <Typography variant='h5' className='newslettertitle'>FLYSTATES Newsletter</Typography>
                            <Typography variant='h6' className='newslettersubtitle'>Subscribe to get information, the latest news and other interesting offers</Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box className={`newsletterform ${errors.email ? ' has-error' : ''}`}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue={''}
                                        rules={{
                                            required: true,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Invalid email address',
                                            },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                placeholder="Enter Email address..."
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <Box className='newsletterAlertMessage'>
                                            <Fade in={true} timeout={500}>
                                                <Alert
                                                    sx={{ borderRadius: 25 }}
                                                    severity="error"
                                                    action={
                                                        <Button color="inherit" size="small" onClick={handleCloseAlert}><FiX size={18} />
                                                        </Button>
                                                    }
                                                >
                                                    Please enter your email address in the box and then hit the subscribe button...
                                                </Alert>
                                            </Fade>
                                        </Box>
                                    )}

                                    {respObj && (
                                        <Box className='newsletterAlertMessage'>
                                            <Fade in={true} timeout={500}>
                                                <Alert
                                                    sx={{ borderRadius: 25 }}
                                                    severity={respObj?.isSuccess ? 'success' : 'error'}
                                                    action={
                                                        <Button color="inherit" size="small" onClick={() => { setRespObj(null) }}><FiX size={18} />
                                                        </Button>
                                                    }
                                                >
                                                    {respObj?.message}
                                                </Alert>
                                            </Fade>
                                        </Box>
                                    )}

                                    <LoadingButton
                                        variant='contained'
                                        color='primary'
                                        loading={isSubmitting}
                                        type="submit"
                                        disabled={isSubmitting}
                                        sx={{ borderRadius: '50px', height: '45px' }}
                                    >
                                        Subscribe
                                    </LoadingButton>
                                </Box>
                                <Box className="mt-3">
                                    <FormControlLabel className='newsletterCheckbox' control={<Checkbox checked disabled />}
                                        label={<Typography variant="h6">I agree to receive offers according to conditions mentioned in our Privacy Policy.</Typography>}
                                    />
                                </Box>
                            </form>
                        </Box>
                        <Box className="newsletterTopIcon">
                            <FiSend />
                        </Box>
                    </Stack>
                </Box>
            </Container>
        </>
    )
}

export default Newsletter