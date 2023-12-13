import {useQuery,gql} from '@apollo/client'

const GET_TASKS = gql`
query {
    tasks {
      id
      title
      description
      user_id
    }
  }
`

export const useTaskLists = () => {

    const { error, data, loading, refetch } = useQuery(GET_TASKS);

    const refetchTasks = async () => {
        try {
          await refetch();
        } catch (error) {
          console.error('Error refetching tasks:', error);
        }
      };

      return { error, data, loading, refetchTasks };
}
