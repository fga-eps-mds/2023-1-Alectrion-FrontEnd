import { Flex } from '@chakra-ui/react';
import { MovimentacaoConfirmButton, MovimentacaoCancelButton } from './MovimentacaoButtons';
import { NumeroTermoProps } from './MovimentacaoTitle';
import { DataProps } from './MovimentacaoTitle';
import { TotalEquipamentosProps } from './MovimentacaoTitle';
import { MovimentacaoTitle } from './MovimentacaoTitle';
import { AtribuicaoDropdown, ResponsavelTermo } from './MovimentacaoResponsavelSelect';
import {ResponsavelTexto,AtribuicaoDropdown2,TipoDeLotaçãoDropdown,CidadeDropdown,PostoDeTrabalhoDropdown} from './MovimentacaoDetalhes'


export default function MovimentacaoModal() {
  const numeroTermo = '010101';
  const dataProps = new Date();
  const totalEquipamentosProps = '10';

  return (
    <Flex flexDirection="column" boxShadow="lg" px="44px" pt="24px" pb="64px">
        <MovimentacaoTitle />
        <NumeroTermoProps numeroTermo={numeroTermo} />
        <DataProps dataProps={dataProps} />
        <TotalEquipamentosProps totalEquipamentosProps={totalEquipamentosProps} />
        <MovimentacaoConfirmButton />
        <MovimentacaoCancelButton />
        <ResponsavelTermo/>
        <AtribuicaoDropdown/>
        <PostoDeTrabalhoDropdown/>
        <CidadeDropdown/>
        <TipoDeLotaçãoDropdown/>
        <AtribuicaoDropdown2/>
        <ResponsavelTexto/>
    </Flex>
  );
}