'use client';

import { useUser } from '@/features/users/hooks/useUser';

interface Props {
  username: string;
}

export function UserDetail({ username }: Props) {
  const { user } = useUser(username);

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
