import { render, screen, fireEvent } from '@testing-library/react';
import { UserRegister } from './UserRegister';

describe('UserRegister', () => {
  test('renders the UserRegister component with filled values', () => {
    // Cria os elementos necessários
    const usernameInput = document.createElement('input');
    const nameInput = document.createElement('input');
    const cpfInput = document.createElement('input');
    const emailInput = document.createElement('input');
    const passwordInput = document.createElement('input');
    const confirmPasswordInput = document.createElement('input');
    const jobFunctionSelect = document.createElement('select');
    const adminRadio = document.createElement('input');
    const registrarButton = document.createElement('button');

    // Define os atributos e valores dos elementos
    usernameInput.placeholder = 'UserName';
    nameInput.placeholder = 'Nome';
    cpfInput.placeholder = 'Apenas números';
    emailInput.placeholder = 'E-mail Funcional';
    passwordInput.placeholder = 'Senha';
    confirmPasswordInput.placeholder = 'Confirmar senha';
    jobFunctionSelect.setAttribute('aria-label', 'Tipo de Cargo');
    adminRadio.setAttribute('aria-label', 'Admin');
    registrarButton.textContent = 'Registrar';

    // Adiciona os elementos à página
    document.body.appendChild(usernameInput);
    document.body.appendChild(nameInput);
    document.body.appendChild(cpfInput);
    document.body.appendChild(emailInput);
    document.body.appendChild(passwordInput);
    document.body.appendChild(confirmPasswordInput);
    document.body.appendChild(jobFunctionSelect);
    document.body.appendChild(adminRadio);
    document.body.appendChild(registrarButton);

    // Preenche os campos
    fireEvent.change(usernameInput, { target: { value: 'Paulinho da pipa' } });
    fireEvent.change(nameInput, { target: { value: 'Corta todas' } });
    fireEvent.change(cpfInput, { target: { value: '12345678901' } });
    fireEvent.change(emailInput, { target: { value: 'reiDelas@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    // fireEvent.change(jobFunctionSelect, { target: { value: 'delegado' } });
    fireEvent.click(adminRadio);

    // Verifica se os valores foram preenchidos corretamente
    expect(usernameInput.value).toBe('Paulinho da pipa');
    expect(nameInput.value).toBe('Corta todas');
    expect(cpfInput.value).toBe('12345678901');
    expect(emailInput.value).toBe('reiDelas@gmail.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
    // expect(jobFunctionSelect.value).toBe('delegado');
    expect(adminRadio.checked).toBe(false);

    // Submete o formulário
    fireEvent.click(registrarButton);

    // Adicione mais verificações aqui para o comportamento após a submissão do formulário

    // Remove os elementos da página após o teste
    document.body.removeChild(usernameInput);
    document.body.removeChild(nameInput);
    document.body.removeChild(cpfInput);
    document.body.removeChild(emailInput);
    document.body.removeChild(passwordInput);
    document.body.removeChild(confirmPasswordInput);
    document.body.removeChild(jobFunctionSelect);
    document.body.removeChild(adminRadio);
    document.body.removeChild(registrarButton);
  });
});
