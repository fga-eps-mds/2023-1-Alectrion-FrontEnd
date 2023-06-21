/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Center, Input, Text, Flex } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/modal';
import { api } from '../../config/lib/axios';
import { toast } from '@/utils/toast';


export function PasswordRecover() {
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState('Recuperar senha');
    const [statusModal, setStatusModal] = useState<boolean>(false);
    const toggleModal = () => {
    setStatusModal(!statusModal);
    };

    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<CredentialUserPasswordRecover>();

    const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    try {

        const payload: CredentialUserPasswordRecover = formData
        
        console.log(payload)
        const  resp = await api.get(
            `user/recover`,{
                params: payload
            } 
            );    
        if(resp.status === 200) {
            toast.success(resp.data.message)
        }
        setIsLoading(false);

    } catch (error : any) {
        console.log(error.request)
        toast.error(JSON.parse(error.request.response).error)
        setIsLoading(false);
        setEmailSent('Enviar e-mail novamente')
    }
    });

    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/login');
      };


    return (
    <Flex
        aria-label="form"
        bgGradient="linear(288.94deg, #F8B86D 0%, #F78F88 90.96%)"
        h="100vh"
        color="white"
    >
        <form  aria-label="form" onSubmit={onSubmit}>
        <Box
            height="100%"
            width="100vw"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
            bg="white"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
            color="black"
            paddingY="5%"
            paddingX="5%"
            m="0.4%"
            display="flex"
            flexDir="column"
            >
            <Text mb="3%" color="black" fontWeight="medium" fontSize="4xl">
                Recuperar
                <Text>
                Senha
                </Text>
            </Text>
            <Box mb="7%" >
                <Text
                pl="5px"
                pb="8px"
                color="#605555"
                fontWeight="medium"
                fontSize="lg"
                >
                E-mail
                </Text>
                <Input
                size="lg"
                fontSize="lg"
                type='email'
                {...register('email', { required: true })}
                placeholder="email"
                />
                {errors.email && (
                <span>
                    <Text color="red.400">Este campo é obrigatório</Text>
                </span>
                )}
            </Box>
            <Center>
                <Button
                mb="7%"
                type="submit"
                paddingX="24"
                width="sm"
                isLoading={isLoading}
                >
                {emailSent} 
                </Button>
            </Center>
            <Center>
                <Button 
                onClick={handleBack}
                variant="link" 
                color="#239875" 
                type = "submit"
                >
                Voltar
                </Button>
            </Center>
            </Box>
        </Box>
        </form>
    </Flex>
    );
}
    