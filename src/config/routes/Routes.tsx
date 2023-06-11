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
import { UserRegister } from '@/pages/user-register/UserRegister';
import { PasswordRecover } from '@/pages/password-recover/PasswordRecover';
import { View } from '@/pages/view';

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
        path="/order-services"
        element={
          <RequireAuth>
            <OrderServiceTable />
          </RequireAuth>
        }
      />
      <Route 
        path="/user-register" 
        element={
          <RequireAuth>
            <UserRegister />
          </RequireAuth>} />

      <Route
        path="/view"
        element={
          <RequireAuth>
            <View />
          </RequireAuth>
        }
      />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
}
