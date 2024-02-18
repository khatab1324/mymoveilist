//temprory
import { useFetchusersQuery} from "../movieStore"
export default function ShowUsers(){
    const {data,error,isLoading}=useFetchusersQuery();
   
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {/* Display the fetched data */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>
    </div>
  );
        }
