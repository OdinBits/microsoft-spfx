import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {IPropertyPaneConfiguration,PropertyPaneTextField} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'FocDocumentWpWebPartStrings';
import IContextAndSiteUrl from './interfaces/IContextAndSiteUrl';
import MainApp from './main/MainApp';
import { getSP } from './util/getSPUtil';



export interface IFocDocumentWpWebPartProps 
{
  description: string;
}

export default class FocDocumentWpWebPart extends BaseClientSideWebPart<IFocDocumentWpWebPartProps> 
{
  private siteUrl: string = '';

  public render(): void {
    const element: React.ReactElement<IContextAndSiteUrl> = React.createElement(
      MainApp,
      {
        context: this.context,
        siteUrl: this.siteUrl, 
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected async onInit(): Promise<void> {
    await super.onInit();
    this.siteUrl = this.context.pageContext.web.absoluteUrl;

    getSP(this.context);
    
    await this._getEnvironmentMessage();
  }

  private async _getEnvironmentMessage(): Promise<string> 
  {
    if (!!this.context.sdks.microsoftTeams) 
    {
      try {
        const context = await this.context.sdks.microsoftTeams.teamsJs.app.getContext();
        let environmentMessage: string = '';
        switch (context.app.host.name) {
          case 'Office':
            environmentMessage = this.context.isServedFromLocalhost
              ? strings.AppLocalEnvironmentOffice
              : strings.AppOfficeEnvironment;
            break;
          case 'Outlook':
            environmentMessage = this.context.isServedFromLocalhost
              ? strings.AppLocalEnvironmentOutlook
              : strings.AppOutlookEnvironment;
            break;
          case 'Teams':
            environmentMessage = this.context.isServedFromLocalhost
              ? strings.AppLocalEnvironmentTeams
              : strings.AppTeamsTabEnvironment;
            break;
          default:
            throw new Error('Unknown host');
        }
        return environmentMessage;
      } catch (error) {
        console.error('Error getting Teams context:', error);
      }
    }

    return this.context.isServedFromLocalhost
      ? strings.AppLocalEnvironmentSharePoint
      : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
