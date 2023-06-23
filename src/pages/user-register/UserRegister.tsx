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
    import { Box, Button, Center, Input, Text, Flex, Spacer, Grid, GridItem, Radio, RadioGroup, HStack } from '@chakra-ui/react';
    import { api } from '@/config/lib/axios';
    import { toast } from '@/utils/toast';
    import { LoginResponse,TIPOS_JOB} from '../../constants/user';
    import { AlectrionIcon } from '../../components/icons/AlectrionIcon';
    import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';

    export function UserRegister() {
      const [selectedUserRegister, setSelectedUserRegister] = useState<RegisterUserPayload>();
 
      const [refreshRequest,setRefreshRequest] = useState<boolean>(false);
    
      const [statusModal, setStatusModal] = useState<boolean>(false);

      const toggleModal = () => {
        setStatusModal(!statusModal);
      };
     
      const {
        watch,
        control,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<RegisterUserPayload>();
      const onSubmit = handleSubmit(async (formData) => {
        try {
          const { username,email,name,cpf,role,jobFunction,password, ...rest } =
            formData;

          const payload = {
            username: formData.username,
            email: formData.email,
            name: formData.name,
            cpf: formData.cpf,
            role: formData.role,
            jobFunction: formData.jobFunction,
            password: formData.password,
            ...rest,
          };

          const loggedUser = JSON.parse(
            localStorage.getItem('@alectrion:user') || ''
          ) as unknown as LoginResponse;
          const response = await api.post('user/create', payload, {
            headers: {
              Authorization: `Bearer ${loggedUser.token}`,
            }});
          
          if (response.status === 200) {
            setRefreshRequest(!refreshRequest);
            window.history.back()
            toast.success('Usuário cadastrado com sucesso', 'Sucesso');
            return;
          }
          toast.error('Erro ao tentar cadastrar o usuario', 'Erro');
        } catch (error: any) {
          toast.error(error.response.data.error, 'Erro');
         }
      });

      return (        
            <Flex
            aria-label="form"
            bgGradient="linear(288.94deg, #F8B86D 0%, #F78F88 90.96%)"
            h="100vh"
            color="white"
            align="center"
            justify="center"
          >
            <Flex w="32%" justify="center" alignSelf="center"/>
          
            <form id = "user-register-form" onSubmit={onSubmit} aria-label="form">
              <Box
                bg="white"
                borderRadius="10px"
                boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
                color="black"
                paddingY="7%"
                paddingX="7%"
                m="4%"
                width="130%"
              >
              <Flex justify="center" mt={6} alignSelf="center"> 
                <AlectrionIcon height={10} width={10} />
              </Flex>
              <Text mb={10} textAlign="center" fontSize="4xl" alignSelf="center">
                Alectrion
              </Text>
              <Text mb="4%" color="#605555" fontWeight="semibold" fontSize="4xl" alignSelf="center">
                Cadastro
              </Text>
              
              <Grid templateColumns="repeat(2, 2fr)" width="100%" gap={6} mt={6} alignSelf="center">
              <Box flexDirection="column" alignSelf="center">
                  <Text>Nome</Text>
                  <Input 
                    placeholder="Nome" 
                    defaultValue={selectedUserRegister?.name}
                    {...register('name', {
                      required: 'Campo Obrigatório',
                      maxLength: 50,
                    })}
                  />
                  {errors.name && (
                  <span>
                    <Text color="red.400">Este campo é obrigatório</Text>
                  </span>
                )}
              </Box>

              <Box flexDirection="column">
                  <Text>UserName</Text>
                  <Input 
                    placeholder="UserName"
                    defaultValue={selectedUserRegister?.username}
                    {...register('username', {
                      required: 'Campo Obrigatório',
                      maxLength: 50,
                    })}
                  />
                  {errors.username && (
                  <span>
                    <Text color="red.400">Este campo é obrigatório</Text>
                  </span>
                )}
                  
              </Box>
              </Grid>

            <Grid templateColumns="repeat(2, 2fr)" width="100%" gap={6} mt={6}>
            <Box flexDirection="column">
                <Text>CPF</Text>
                <Input 
                  placeholder="Apenas números"  pattern="[0-9]*" title="Por favor, digite apenas números"
                  {...register('cpf', {
                    required: 'Campo Obrigatório',
                    maxLength: 11,
                  })}
                />
            </Box>

            <Box flexDirection="column">
                <Text>E-mail Funcional</Text>
                <Input 
                  placeholder="E-mail Funcional" 
                  defaultValue={selectedUserRegister?.email}
                  {...register('email', {
                    required: 'Campo Obrigatório',
                    maxLength: 50,
                  })}
                />
                {errors.email && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
        
            </Box>
            </Grid>

            <Grid templateColumns="repeat(2, 2fr)" width="100%" gap={6} mt={6} mb={6} alignSelf="center">
            <Box flexDirection="column" alignSelf="center" >
                <Text>Senha</Text>
                <Input 
                  type="password"
                  placeholder="Senha" 
                  defaultValue={selectedUserRegister?.password}
                  {...register('password', {
                    required: 'Campo Obrigatório',
                    maxLength: 50,
                   
                  })}
                />
                {errors.password && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
                
            </Box>

            <Box flexDirection="column" alignSelf="center" >
                <Text>Confirmar senha</Text>
                <Input 
                  type="password"
                  placeholder="Confirmar senha"
                   
              />
                  {errors.confirmPassword && (
                  <span>
                    <Text color="red.400">Este campo é obrigatório</Text>
                  </span>
                )}
            </Box>
                <NewControlledSelect
                  control={control}
                  name="jobFunction"
                  id="jobFunction"
                  options={TIPOS_JOB}
                  placeholder="Selecione uma opção"
                  label="Tipo de Cargo"
                  rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
                />
            </Grid>
            <Box>
              <Center mb={2}>
                Tipo de Usuário
              </Center>
              <Flex justify="center" mb={4}>
                <RadioGroup defaultValue="user">
                  <HStack spacing={6}>
                    <Radio value="ADMIN" colorScheme='orange' 
                    {...register('role', {
                      required: 'Campo Obrigatório',
                    })}>
                      Admin
                    </Radio>
                    <Radio value="BASICO" colorScheme='orange' 
                    {...register('role', {
                      required: 'Campo Obrigatório',
                    })}>
                      Básico
                    </Radio>
                    <Radio value="CONSULTA" colorScheme='orange' 
                    {...register('role', {
                      required: 'Campo Obrigatório',
                    })}>
                      Consulta
                    </Radio>
                  </HStack>
                </RadioGroup>
              </Flex>
            </Box>
              <Flex gap="4rem" mt="2rem" mb="2rem" justify="center">
                <Button variant="secondary" width="100%"  onClick={() => window.history.back()}>
                    Cancelar
                </Button>

                <Button
                    type="submit"
                    form="user-register-form"
                    variant="primary"
                    width = "100%"
                > 
                    Registrar
                </Button>
                </Flex>
            </Box>
          </form>
          <Spacer />
        </Flex>
      );
    }
