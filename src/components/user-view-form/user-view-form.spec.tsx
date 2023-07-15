import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import UserViewForm from '.';
import { Job, Role } from '@/constants/user';

const USER_MOCK = {
	id: 'id',
	name: 'pedro',
	cpf: '12345678901',
  email: 'pedro@gmail.com',
  username: 'pedrao123',
  job: Job.DELEGADO,
  role: Role.ADMIN,
  createdAt: new Date(2000, 1, 1),
  updatedAt: new Date(2000, 1, 1),
  deletedAt: null,
  isDeleted: 'false',
	temporarypassword: false
};

describe('UserViewForm', () => {
  it('should render correctly', () => {
    render(
      <UserViewForm
        selectedUser={USER_MOCK}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Perfil')).toBeInTheDocument();
    expect(screen.getByLabelText('Cargo')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  it('should render corret data', async () => {
    render(
      <UserViewForm
        selectedUser={USER_MOCK}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Usuário').textContent).toBe(USER_MOCK.username);
    expect(screen.getByLabelText('Nome').textContent).toBe(USER_MOCK.name);
    expect(screen.getByLabelText('CPF').textContent).toBe(USER_MOCK.cpf);
    expect(screen.getByLabelText('Email').textContent).toBe(USER_MOCK.email);
    expect(screen.getByLabelText('Perfil').textContent).toBe(USER_MOCK.role);
    expect(screen.getByLabelText('Cargo').textContent).toBe(USER_MOCK.job);
	});
});
