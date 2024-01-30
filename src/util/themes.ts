export interface ThemeObject {
    background_color: string;
    card_background_color: string;
    background_image_url: string;
    positive_notification_color: string;
    error_notification_color: string;
    primary_color: string;
    primary_text_color: string;
    secondary_color: string;
    secondary_text_color: string;
    rotation_card_background_color: string;
    icon_color: string;
}

import dark_titan_background from "../assets/background_dark_titan.png"

export const theme_dark = JSON.stringify({
    background_color: '#212121',
    card_background_color: '#1E1E1E',
    rotation_card_background_color: '#282828',
    primary_color: '#409bdb',
    secondary_color: '#ffffff',
    primary_text_color: '#ffffff',
    secondary_text_color: '#cccccc'
} as ThemeObject)

export const theme_dracula = JSON.stringify({
    background_color: '#282A36',
    card_background_color: '#44475A',
    rotation_card_background_color: '#282A36',
    primary_color: '#FF79C6',
    secondary_color: '#BD93F9',
    primary_text_color: '#F8F8F2',
    secondary_text_color: '#6272A4',
    icon_color: '#8BE9FD'
} as ThemeObject)

export const theme_light = JSON.stringify({
    background_color: '#ffffff',
    card_background_color: '#ffffff',
    rotation_card_background_color: '#e6e6e6',
    primary_color: '#5ec1ff',
    secondary_color: '#777691',
    primary_text_color: '#000',
    secondary_text_color: '#000'
} as ThemeObject)

export const theme_red = JSON.stringify({
    "background_color": "#2b2020",
    "card_background_color": "#342626",
    "rotation_card_background_color": "#3d2f2f",
    "primary_color": "#d94e4e",
    "secondary_color": "#ffffff",
    "primary_text_color": "#ffffff",
    "secondary_text_color": "#f2cccc"
} as ThemeObject)

export const theme_purple = JSON.stringify({
    background_color: "#292034",
    card_background_color: "#31243F",
    rotation_card_background_color: "#3B2C4A",
    primary_color: "#9C77B5",
    secondary_color: "#ffffff",
    primary_text_color: "#ffffff",
    secondary_text_color: "#D3C1E5"
} as ThemeObject);

export const theme_titan = JSON.stringify({
    background_image_url: "https://i.imgur.com/JqbFGOc.png", // Keeping the background image as is
    card_background_color: "#b292e6", // A pastel purple
    rotation_card_background_color: "#9bd2e6", // A pastel sky blue
    primary_color: "#e6e6e6", // A very light grey for a pastel touch
    secondary_color: "#a084ff", // A softer pastel purple
    primary_text_color: "#224", // White text for contrast on darker colors
    secondary_text_color: "#335" // A very light grey that's softer than pure white
} as ThemeObject);

