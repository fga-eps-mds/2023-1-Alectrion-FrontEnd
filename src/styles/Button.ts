/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import type { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: {
      minWidth: '175px',
      color: '#F4F7F5',
      backgroundColor: 'primary',
      backgroundImage:
        'linear-gradient(to right, #FF8008 0%, #FFA03A 51%, #FF8008 100%);',
      backgroundSize: '200% auto',
      borderRadius: '45px',
      boxShadow: 'soft',
      transition: '0.5s',
      _hover: {
        backgroundPosition:
          'right center' /* change the direction of the change here */,
        textDecoration: 'none',

        _disabled: {
          background: '',
        },
      },
    },
    secondary: {
      minWidth: '175px',
      color: '#FFFFFF',
      backgroundImage:
        'linear-gradient(to right, #212121 0%, #333333  51%, #4D4D4D  100%)',
      backgroundSize: '200% auto',
      borderRadius: '45px',
      boxShadow: 'soft',
      transition: '0.5s',
      _hover: {
        backgroundPosition: 'right center',
        textDecoration: 'none',

        _disabled: {
          background: '',
        },
      },
    },
    tertiary: {
      color: '#333',
      backgroundImage:
        'linear-gradient(to right, #E0EAFC 0%, #CFDEF3  51%, #E0EAFC  100%)',
      backgroundSize: '200% auto',
      boxShadow: 'sm',
      transition: '0.5s',
      _hover: {
        backgroundPosition:
          'right center' /* change the direction of the change here */,
        textDecoration: 'none',

        _disabled: {
          background: '',
        },
      },
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
