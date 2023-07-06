/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { useCallback, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { ActionButtonProps } from '../types';

type DeleteButtonProps<Data> = ActionButtonProps<Data>;

const tooltipStyle = {
  bg: 'red.500',
  color: 'white',
};

export function DeleteExtensiveIcon<Data>({
  label,
  onClick,
  ...props
}: DeleteButtonProps<Data>) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    await (onClick as () => void)?.();
    onClose?.();
    setIsLoading(false);
  }, [onClose, onClick]);

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} placement="top">
      <PopoverAnchor>
      <IconButton
        aria-label="Excluir Usuário"
        variant="ghost"
        icon={<MdDelete />}
        width="5%"
        onClick={onOpen}
      />
      </PopoverAnchor>
      <PopoverContent
        data-testid="delete-confirmation-popover"
        border={0}
        borderRadius="base"
        bg="blackAlpha.600"
        backdropFilter="blur(8px)"
        color="white"
      >
        <PopoverArrow />
        <PopoverCloseButton color="white" top={2} right={2} />

        <PopoverHeader bg="blackAlpha.600" borderTopRadius="base" border={0}>
          <Heading size="md" color="white" fontWeight="semibold">
            Excluir {label}
          </Heading>
        </PopoverHeader>

        <PopoverBody bg="blackAlpha.300">
          <Text>
            Você realmente deseja excluir o <strong>{label}</strong>?
          </Text>
          <Text fontStyle="italic" mt={1}>
            Está ação não poderá ser desfeita.
          </Text>
        </PopoverBody>

        <PopoverFooter borderBottomRadius="base" border={0} bg="blackAlpha.300">
          <Flex justifyContent="space-between">
            <Button onClick={onClose} variant="solid" colorScheme="blackAlpha">
              Cancelar
            </Button>
            <Button onClick={handleDelete} colorScheme="red" variant="solid">
              Excluir
            </Button>
          </Flex>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
