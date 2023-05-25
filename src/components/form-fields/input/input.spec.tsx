import { render, screen } from '@testing-library/react';
import { Input } from './index';

describe('Input', () => {
  test('renders input component with label', () => {
    const label = 'Username';
    render(<Input label={label} errors={undefined} />);

    expect(screen.getByLabelText(label)).toBeInTheDocument();
  });

  test('renders input component with error message', () => {
    const errorMessage = 'Required field';
    render(
      <Input
        label="Username"
        errors={{ type: 'Error', message: errorMessage }}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders input component with left element', () => {
    const leftElementText = 'Left Element';
    render(
      <Input leftElement={<span>{leftElementText}</span>} errors={undefined} />
    );

    expect(screen.getByText(leftElementText)).toBeInTheDocument();
  });

  test('renders input component with right element', () => {
    const rightElementText = 'Right Element';
    render(
      <Input
        rightElement={<span>{rightElementText}</span>}
        errors={undefined}
      />
    );

    expect(screen.getByText(rightElementText)).toBeInTheDocument();
  });
});
