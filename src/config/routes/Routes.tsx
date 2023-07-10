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
import { RequireAuth } from './require-auth';
import { PasswordRecover } from '@/pages/password-recover/PasswordRecover';
import { ChangePassword } from '@/pages/change-password';
import { ViewProfile } from '@/pages/view-profile/ViewProfileControl';
import { UsersTable } from '@/pages/users/UsersControl';
import { EquipmentsFields } from '@/pages/equipments-fields/EquipmentsFields';

export function Router() {
  return (
    <Routes>
      {/* ROTAS PRIVADAS */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <EquipmentTable />
          </RequireAuth>
        }
      />

      {/* ROTAS PUBLICAS */}
      <Route path="/login" element={<Login />} />
      <Route path="/pass-recover" element={<PasswordRecover/>}/>
      <Route
        path="/movements"
        element={
          <RequireAuth>
            <MovementsTable />
          </RequireAuth>
        }
      />
      <Route
        path="/equipments"
        element={
          <RequireAuth>
            <EquipmentTable />
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth>
            <UsersTable />
          </RequireAuth>
        }
      />
      <Route
        path="/order-services"
        element={
          <RequireAuth>
            <OrderServiceTable />
          </RequireAuth>
        }
      />

      <Route
        path="/change-password"
        element={
          <RequireAuth>
            <ChangePassword />
          </RequireAuth>
        }
      />
      <Route
        path="/view-profile"
        element={
          <RequireAuth>
            <ViewProfile />
          </RequireAuth>
        }
      />
      <Route
        path="/equipments-fields"
        element={
          <RequireAuth>
            <EquipmentsFields />
          </RequireAuth>
        }
      />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}