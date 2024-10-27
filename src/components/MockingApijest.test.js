import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('displays loading state', () => {
  fetch.mockImplementation(() => new Promise(() => {}));
  render(<RecipeList />);
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('displays recipes on successful fetch', async () => {
  fetch.mockResolvedValueOnce({
    json: async () => [
      { id: 1, title: 'Pasta', ingredients: ['Pasta', 'Tomato Sauce'] },
    ],
  });
  
  render(<RecipeList />);
  
  expect(await screen.findByRole('heading', { name: /pasta/i })).toBeInTheDocument();
});

test('displays error on failed fetch', async () => {
  fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
  
  render(<RecipeList />);
  
  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
