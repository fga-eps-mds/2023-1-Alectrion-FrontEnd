/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { useCallback, useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';
import { ActionButton } from '..';

interface RefreshButtonProps {
  refresh: () => Promise<unknown>;
}

export function RefreshButton({ refresh }: RefreshButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    refresh?.().finally(() => setIsLoading(false));
  }, [refresh]);

  return (
    <ActionButton
      icon={<FaSyncAlt />}
      label="Atualizar Dados"
      onClick={handleRefresh}
      isLoading={isLoading}
      variant="outline"
    />
  );
}
