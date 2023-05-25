import { render } from '@testing-library/react';
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react';
import { toast } from '@/utils/toast';

const { ToastContainer } = createStandaloneToast();

describe('Toast', () => {
  it('should create a warnig toast successfully', async () => {
    const response = toast.warning('mensagem de alerta', 'titulo de alerta');
    expect(response).toBeDefined();

    const { findAllByText } = render(
      <ChakraProvider>
        <ToastContainer />
      </ChakraProvider>
    );

    const toastMessage = await findAllByText('mensagem de alerta');

    toastMessage.forEach((t) => {
      expect(t).toBeInTheDocument();
    });
  });

  it('should create a success toast successfully', async () => {
    const response = toast.success('mensagem de sucesso', 'titulo de sucesso');
    expect(response).toBeDefined();

    const { findAllByText } = render(
      <ChakraProvider>
        <ToastContainer />
      </ChakraProvider>
    );

    const toastMessage = await findAllByText('mensagem de sucesso');
    toastMessage.forEach((t) => {
      expect(t).toBeInTheDocument();
    });
  });

  it('should create a error toast successfully', async () => {
    const response = toast.error('mensagem de erro', 'titulo de erro');
    expect(response).toBeDefined();

    const { findAllByText } = render(
      <ChakraProvider>
        <ToastContainer />
      </ChakraProvider>
    );

    const toastMessage = await findAllByText('mensagem de erro');
    toastMessage.forEach((t) => {
      expect(t).toBeInTheDocument();
    });
  });
});
