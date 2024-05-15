import * as React from 'react';
import { DataProvider } from '../context/DataTrackingContext';
import Main from './Main';
import { AppProvider } from '../context/DataFetcher';
import { ApproverProvider } from '../context/ApproverFetcher';


const MainApp: React.FC<{context: any}> = ({ context }) => 
{
  return (
    
    <DataProvider>
      <AppProvider context={context}>
        <ApproverProvider>
          <Main />
        </ApproverProvider>
      </AppProvider>
    </DataProvider>

  );
};

export default MainApp;


