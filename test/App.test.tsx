import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import App from '../src/App';

const mockAbsenceData = [
  {
    firstName: 'Jabez',
    lastName: 'Nasser',
    id: '24a9352b-cf35-4e00-b4c9-403546d7bea8'
  },
  {
    firstName: 'Isla',
    lastName: 'Watts',
    id: '08335a8f-1b4f-4d9b-82a8-46fa20d48f2d'
  },
  {
    firstName: 'Malaysia',
    lastName: 'Krueger',
    id: 'f1128070-8fc9-4ccb-8657-f5e1c7cacad9'
  },
  {
    firstName: 'Kylei',
    lastName: 'Castanon',
    id: '8d0593d5-de4a-48c9-afa5-55127c0d349d'
  }
];

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockAbsenceData)
    } as unknown as Response);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the App', () => {
    render(<App />);
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('fetches the absence data from  the server', async () => {
    render(<App />);

    expect(false).toBe(true);
  });
});
