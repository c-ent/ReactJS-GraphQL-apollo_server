import { useQuery, gql } from '@apollo/client';
import { useAuth } from './useAuth';

const GET_TASKS = gql`
  query Tasks($user_id: Int!) {
    tasks(user_id: $user_id) {
      id
      title
      description
      user_id
    }
  }
`;

export const useTaskLists = () => {
  const { user, handleLogout } = useAuth();
  const { error, data, loading, refetch } = useQuery(GET_TASKS, {
    variables: {
      user_id: user.id,
    },
  });

  const refetchTasks = async () => {
    try {
      await refetch();
    } catch (error) {
      console.error('Error refetching tasks:', error);
    }
  };
  console.log(data)
  return { error, data, loading, refetchTasks };
};
