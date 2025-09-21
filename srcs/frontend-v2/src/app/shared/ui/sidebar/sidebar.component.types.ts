import { Signal, Type } from '@angular/core';
import { langKeys } from '../../../state/i18n/i18n.state.types';

export type sidebarElement = {
  name: langKeys;
  nameSignal?: Signal<string>;
  isNameSignal?: boolean;
  routerLink?: string;
  href?: string;
  content?: Type<unknown>;
  iconAsset: string;
};
export type SidebarConfig = sidebarElement[];
