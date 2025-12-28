
import { useNavigate } from 'react-router-dom';

const First = () => {
  const navigate = useNavigate();

  return(
    <div>
      <button onClick={() => navigate("/user")}> USER </button>
      <br/><br/><br/>
      <button onClick={() => navigate("/admin")}> ADMIN </button>
    </div>
  );
}

export default First;