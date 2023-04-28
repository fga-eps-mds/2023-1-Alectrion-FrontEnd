/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
/* eslint-disable react/jsx-no-useless-fragment */

import { ReactNode, useCallback, useEffect, useRef } from 'react';

const events = [
  'load',
  'mousemove',
  'mousedown',
  'click',
  'scroll',
  'keypress',
];

const THIRTY_MINUTES_IN_MS = 60000 * 30;

export function AutoLogoutComponent({ children }: { children: ReactNode }) {
  const timer = useRef<NodeJS.Timeout>();

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, [timer]);

  const handleLogoutTimer = useCallback(() => {
    timer.current = setTimeout(() => {
      resetTimer();

      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });

      // TODO: get function from authContext
      // signOut();
    }, THIRTY_MINUTES_IN_MS);
  }, [resetTimer]);

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });

    return Object.values(events).forEach((item) => {
      window.removeEventListener(item, resetTimer);
    });
  }, [handleLogoutTimer, resetTimer]);

  return <>{children}</>;
}
