import { UsersTable } from '@/features/UsersTable';
import { api } from '@/shared/api/api';

export default async function Home() {
  const users = await api.jsonPlaceholder.users.getUsers();

  return <UsersTable users={users} />;
}
