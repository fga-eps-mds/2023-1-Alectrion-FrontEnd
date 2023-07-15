import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import UserViewForm from '.';
import { Job, Role } from '@/constants/user';

const USER_MOCK = {
  name: 'pedro',
  cpf: '12345678901',
  email: 'pedro@gmail.com',
  username: 'pedrao123',
  job: Job.DELEGADO,
  role: Role.ADMIN,
};

describe('UserViewForm', () => {
  beforeEach(() => {
    render(<UserViewForm selectedUser={USER_MOCK} onClose={vi.fn()} />);
  });
  it('should render fields', () => {
    expect(screen.getByLabelText('Usuário')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('CPF')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Perfil')).toBeInTheDocument();
    expect(screen.getByLabelText('Cargo')).toBeInTheDocument();
    expect(screen.getByText('Fechar')).toBeInTheDocument();
  });

  test('should render correct data', () => {
    expect(screen.getByLabelText('Usuário')).toHaveValue(USER_MOCK.username);
    expect(screen.getByLabelText('Nome')).toHaveValue(USER_MOCK.name);
    expect(screen.getByLabelText('CPF')).toHaveValue(USER_MOCK.cpf);
    expect(screen.getByLabelText('Email')).toHaveValue(USER_MOCK.email);
    expect(screen.getByLabelText('Perfil')).toHaveValue(USER_MOCK.role);
    expect(screen.getByLabelText('Cargo')).toHaveValue(USER_MOCK.job);
  });
});
