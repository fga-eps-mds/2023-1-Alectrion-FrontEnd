/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

import { Button } from './Button';
import { colors } from './Colors';

export const theme = extendTheme({
  ...baseTheme,
  colors,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Roboto', sans-serif`,
    color: 'red',
  },
  shadows: {
    thin: 'rgba(27, 31, 35, 0.04) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;',
    soft: '0px 3px 8px rgba(51, 51, 51, 0.2)',
    medium:
      'rgba(55, 55, 55, 0.15) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    large: 'rgba(17,12,46,0.1) 0px 48px 100px 0px',
  },
  styles: {
    global: {
      body: {
        color: '#333333',
        background: 'linear-gradient(135deg, #FFFFFF 20%, #F0F0F0 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
      },
      html: {
        marginLeft: 'calc(100vw - 100%)', // Fix scrollbar jump
        marginRight: 0,
      },
    },
  },
  components: {
    Button,
    Input: {
      baseStyle: {
        field: {
          _focusVisible: {
            borderColor: 'primary',
            boxShadow: '0px 1px 0px 0px primary',
          },
        },
      },
      sizes: {},
      variants: {
        outline: {
          field: {
            borderRadius: 'lg',
            boxShadow: 'thin',
          },
        },
      },
      defaultProps: {
        focusBorderColor: 'primary',
      },
    },
    Textarea: {
      baseStyle: {
        field: {},
      },
      sizes: {},
      variants: {},
      defaultProps: {},
    },
  },
});
