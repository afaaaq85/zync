import { AuthProvider } from "./Context";
import MainStack from "./components/MainStack/MainStack";

function App() {
  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}

export default App;
