import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from './index';

describe('TextArea', () => {
  test('renders TextArea component with label', () => {
    render(
      <form>
        <TextArea label="Textarea Label" errors={undefined} maxChars={100} />
      </form>
    );

    expect(screen.getByLabelText('Textarea Label')).toBeInTheDocument();
  });

  test('displays character count and updates on change', () => {
    const { getByLabelText, getByText } = render(
      <form>
        <TextArea label="Textarea Label" errors={undefined} maxChars={100} />
      </form>
    );

    const textarea = getByLabelText('Textarea Label');
    const characterCount = getByText('0 / 100 caracteres');

    expect(characterCount).toBeInTheDocument();

    fireEvent.change(textarea, { target: { value: 'Hello' } });

    expect(characterCount.textContent).toBe('5 / 100 caracteres');
  });

  test('displays error message for invalid input', () => {
    const { getByLabelText, getByText } = render(
      <form>
        <TextArea
          label="Textarea Label"
          errors={{ type: 'Error', message: 'Invalid input' }}
          maxChars={100}
        />
      </form>
    );
    const errorMessage = getByText('Invalid input');

    expect(errorMessage).toBeInTheDocument();
  });
});
