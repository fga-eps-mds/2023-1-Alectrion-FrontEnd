import { render, screen, renderHook } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { NewControlledSelect } from './index';

describe('NewControlledSelect', () => {
  test('renders the select component with options', () => {
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ];

    const { result } = renderHook(() => useForm());
    const { control } = result.current;

    render(
      <NewControlledSelect
        control={control}
        name="mySelect"
        label="Select an option"
        options={options}
      />
    );

    const selectElement = screen.getByLabelText('Select an option');
    expect(selectElement).toBeInTheDocument();

    options.forEach((option) => {
      const optionElement = screen.getByText(option.label);
      expect(optionElement).toBeInTheDocument();
    });
  });
});
