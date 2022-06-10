import React, { useEffect } from 'react';

import { useGameInfos } from '../../hooks/gameInfos';

const Home: React.FC = () => {
  const {
    walletConnected,
    walletIsInstalled,
    getCurrentAccount,
    currentAccount,
  } = useGameInfos();

  useEffect(() => {
    walletIsInstalled();
  }, []);

  return (
    <div>
      {!walletConnected ? (
        <p>Please install the  Metamask.</p>
      ) : (
        <div>
          <button type="button" onClick={getCurrentAccount}>Connect Account</button>

          <p>{currentAccount}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
