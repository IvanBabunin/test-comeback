import { useQuery } from '@tanstack/react-query';

import { profileApi } from '@/api/profile';
import { queryKeys } from '@/helpers/api/query-keys';

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile.detail(),
    queryFn: profileApi.get,
  });
}
