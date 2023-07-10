import { render, screen } from '@testing-library/react';
import { EquipmentDateField } from '@/components/form-fields/equipment/equipment-date-field';

test('renders component correctly', () => {
  const title = 'Title';
  const name = 'fieldName';
  const defaultValue = '2023-07-10';

  render(
    <EquipmentDateField
      title={title}
      name={name}
      defaultValue={defaultValue}
    />
  );
  expect(screen.getByText(title)).toBeInTheDocument();
  const inputElement = screen.getByRole('textbox', { name }) as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toBe(defaultValue);
  expect(inputElement.type).toBe('date');
});