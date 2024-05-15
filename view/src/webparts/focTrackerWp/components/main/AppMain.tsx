// // MainApp.tsx
// import * as React from 'react';
// import { DataProvider } from '../../context/DataTrackingContext';
// import Main from './Main';
// import { AppProvider } from '../../context/siteConnectionAndUserContext';
// import { WebPartContext } from '@microsoft/sp-webpart-base';

// interface IContextAndSiteUrl 
// {
//   context : WebPartContext;
// }

// const AppMain: React.FC<IContextAndSiteUrl> = ({ context }) => 
// {
//   return (
//     <DataProvider>
//       <AppProvider context={context}>
//         <Main context={context} />
//       </AppProvider>
//     </DataProvider>
//   );
// };

// export default AppMain;
