/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/login';
import { DefaultLayout } from '@/components/layout/default-layout';
import { EquipRegister } from '@/pages/equipment-register';
import { EquipmentTable } from '@/pages/equipaments/EquipamentsControl';

export function Router() {
  return (
    <Routes>
      {/* ROTAS PRIVADAS */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/equipment-register" element={<EquipRegister />} />
        {/* <Route
          index
          element={
            <RequireAuth>
              <Chamados />
            </RequireAuth>
          }
        />
        <Route
          path="chamados"
          element={
            <RequireAuth>
              <Chamados />
            </RequireAuth>
          }
        /> */}
      </Route>

      {/* ROTAS PUBLICAS */}
      <Route path="/login" element={<Login />} />
      <Route path="/equipaments" element={<EquipmentTable />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}
