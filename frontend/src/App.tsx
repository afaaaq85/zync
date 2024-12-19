import { useEffect } from 'react';
import {AuthProvider} from './Context';
import MainStack from './components/MainStack/MainStack';
import { gapi } from 'gapi-script';


function App() {
const cliendId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


useEffect(() => {
  function start() {
    gapi.client.init({
      clientId: cliendId,
      scope: ''

    });
  }
  gapi.load('client:auth2', start);
}, [cliendId]);

  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}

export default App;
