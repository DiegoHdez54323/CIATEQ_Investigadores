import { useEffect, useState } from "react";
import { fetchData } from "./api/api";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  return (
    <div>
      <h1>Datos desde Django</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
