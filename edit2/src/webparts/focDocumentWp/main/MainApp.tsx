import * as React from 'react';
import IContextAndSiteUrl from '../interfaces/IContextAndSiteUrl';
import { DataProvider } from '../context/DataTracker';
import Main from './Main';
import { DataFetcher } from '../context/DataFetcher'; 

const MainApp: React.FC<IContextAndSiteUrl> = ({ context }) => 
{
  return (
    
    <DataProvider>
      <DataFetcher context={context} >
        <Main />
      </DataFetcher>
    </DataProvider>

  );
};

export default MainApp;


