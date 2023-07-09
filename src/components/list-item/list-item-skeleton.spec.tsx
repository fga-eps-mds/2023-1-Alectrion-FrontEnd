import { render, screen } from '@testing-library/react';
import { ListItemSkeleton } from './list-item-skeleton';

describe('ListItemSkeleton', () => {
  it('renders the skeleton component', () => {
    render(<ListItemSkeleton />);

    // Assert that the skeleton component is rendered
    const skeletonElement = screen.getByTestId('list-item-skeleton');
    expect(skeletonElement).toBeInTheDocument();

    // Assert the presence of specific skeleton elements
    const textSkeletonElement = screen.getByText(/some text/i);
    expect(textSkeletonElement).toBeInTheDocument();

    const imageSkeletonElements = screen.getAllByRole('img');
    expect(imageSkeletonElements.length).toBe(3); // Assuming there are 3 image skeletons
  });
});
