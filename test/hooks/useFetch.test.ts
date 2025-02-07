import { vi } from 'vitest';
import useFetch from '../../src/hooks/useFetch';
import { renderHook, waitFor } from '@testing-library/react';

describe('useFetch', () => {
  it('calls use fetch with the provided URL', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue({})
    } as unknown as Response);

    renderHook(() => useFetch('test'))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('test');
    })
  });
});
