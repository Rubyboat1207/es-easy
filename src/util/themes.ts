export interface ThemeObject {
  background_color: string;
  card_background_color: string;
  background_image_url: string;
  positive_notification_color: string;
  error_notification_color: string;
  primary_color: string;
  highlight_text_color: string;
  primary_text_color: string;
  secondary_color: string;
  secondary_text_color: string;
  rotation_card_background_color: string;
  icon_color: string;
  header_background_color: string;
  header_drop_shadow_color: string;
  theme_name?: string;
  is_custom: boolean;
  version: number;
}

export const CURRENT_THEME_VERSION = 1;

export const ThemeObjectDef: { [key: string]: string } = {
  background_color: 'color',
  card_background_color: 'color',
  background_image_url: 'string',
  positive_notification_color: 'color',
  error_notification_color: 'color',
  primary_color: 'color',
  highlight_text_color: 'color',
  primary_text_color: 'color',
  secondary_color: 'color',
  secondary_text_color: 'color',
  rotation_card_background_color: 'color',
  icon_color: 'color',
  header_background_color: 'color',
  header_drop_shadow_color: 'color',
  theme_name: 'string',
};

import america from '../assets/american-flag-america.gif';
import robob from '../assets/robob.png';


function decodeColor(color: string): string {
  // Implementation of decodeColor
  return '#' + parseInt(color, 36).toString(16).padStart(6, '0');
}


export const theme_dark = JSON.stringify({
  background_color: '#212121',
  header_background_color: '#FFFFFF00',
  card_background_color: '#1E1E1E',
  rotation_card_background_color: '#282828',
  primary_color: '#409bdb',
  highlight_text_color: '#9187ed',
  secondary_color: '#ffffff',
  primary_text_color: '#ffffff',
  secondary_text_color: '#cccccc',
  header_drop_shadow_color: '0px 5px 15px black',
  theme_name: 'Dark',
  positive_notification_color: '#6ccc54',
  error_notification_color: '#cc5454',
  version: 1
} as ThemeObject);

export const theme_dracula = JSON.stringify({
  background_color: '#282A36',
  card_background_color: '#44475A',
  rotation_card_background_color: '#282A36',
  highlight_text_color: '#F1FA8C',
  primary_color: '#FF79C6',
  secondary_color: '#BD93F9',
  primary_text_color: '#F8F8F2',
  secondary_text_color: '#6272A4',
  icon_color: '#8BE9FD',
  header_drop_shadow_color: '0px 5px 15px black',
  theme_name: 'Dracula',
  positive_notification_color: '#6ccc54',
  error_notification_color: '#cc5454',
  version: 1
} as ThemeObject);

export const theme_light = JSON.stringify({
  background_color: '#ffffff',
  card_background_color: '#ffffff',
  rotation_card_background_color: '#e6e6e6',
  highlight_text_color: '#de00b5',
  primary_color: '#5ec1ff',
  secondary_color: '#777691',
  primary_text_color: '#000',
  secondary_text_color: '#000',
  header_drop_shadow_color: '0px 5px 15px #00000022',
  theme_name: 'Light',
  positive_notification_color: '#6ccc54',
  error_notification_color: '#cc5454',
  version: 1
} as ThemeObject);

export const theme_purple = JSON.stringify({
  background_color: '#292034',
  card_background_color: '#31243F',
  rotation_card_background_color: '#3B2C4A',
  primary_color: '#9C77B5',
  secondary_color: '#ffffff',
  primary_text_color: '#ffffff',
  highlight_text_color: '#d166ff',
  secondary_text_color: '#D3C1E5',
  header_drop_shadow_color: '0px 5px 15px black',
  theme_name: 'Purple',
  positive_notification_color: '#6ccc54',
  error_notification_color: '#cc5454',
  version: 1
} as ThemeObject);

export const theme_titan = JSON.stringify({
  background_image_url: robob,
  card_background_color: '#b292e6',
  rotation_card_background_color: '#9bd2e6',
  primary_color: '#e6e6e6',
  secondary_color: '#a084ff',
  primary_text_color: '#224',
  secondary_text_color: '#335',
  highlight_text_color: '#b637ed',
  header_drop_shadow_color: '0px 5px 15px #00000022',
  theme_name: 'Robotics',
  positive_notification_color: '#6ccc54',
  error_notification_color: '#cc5454',
  version: 1
} as ThemeObject);

export const theme_american = JSON.stringify({
  background_image_url: america,
  card_background_color: '#B31942',
  rotation_card_background_color: '#0A3161',
  primary_color: '#B31942 ',
  secondary_color: '#0A3161',
  primary_text_color: '#fff',
  secondary_text_color: '#bbb',
  header_background_color: '#00000088',
  highlight_text_color: '#FF0000',
  header_drop_shadow_color: '0px 5px 15px black',
  theme_name: 'American',
  positive_notification_color: '#6ccc54',
  error_notification_color: '#cc5454',
  version: 1
} as ThemeObject);

export const theme_red = JSON.stringify({
  background_color: 'rgb(52, 24, 24)',
  card_background_color: 'rgb(77, 28, 28)',
  rotation_card_background_color: 'rgb(54, 17, 17)',
  primary_color: '#9e2626',
  secondary_color: '#ffffff',
  primary_text_color: 'rgb(222, 148, 148)',
  secondary_text_color: 'rgb(113, 61, 61)',
  header_drop_shadow_color: '0px 5px 15px black',
  theme_name: 'Red',
  positive_notification_color: '#6ccc54',
  error_notification_color: 'rgb(255, 135, 48)',
  version: 1
});
