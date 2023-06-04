/* eslint-disable prettier/prettier */
/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { Routes, Route } from 'react-router-dom';
import { Login } from '@/pages/login';


import { MovementsTable } from '@/pages/movements/MovementControl';
import { EquipmentTable } from '@/pages/equipments/EquipmentsControl';
import { OrderServiceTable } from '@/pages/order-service/OrderServiceControl';

export function Router() {
  return (
    <Routes>
      {/* ROTAS PRIVADAS */}
      <Route path="/" element={<EquipmentTable />}>
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
      <Route path="/movements" element={<MovementsTable />} />
      <Route path="/equipments" element={<EquipmentTable />} />
      <Route path="/order-services" element={<OrderServiceTable />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}
