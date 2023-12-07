const globalSettingsName = 'global';

export interface ISettings {
  skill_categories: string[];
  blog_categories: string[];
  user_id: number;
  resume_id: number;
  about: string;
  home: string;
}

export interface ISettingsOptional {
  skill_categories?: string[];
  blog_categories?: string[];
  user_id?: number;
  resume_id?: number;
  about?: string;
  home?: string;
}

export const SettingsDefault: ISettings = {
  skill_categories: ['Languages', 'Frameworks', 'Libraries', 'Databases', 'Tools'],
  blog_categories: ['General', 'Technology', 'Programming', 'Life', 'Work', 'Other'],
  user_id: 1,
  resume_id: 1,
  about: '',
  home: '',
};

export interface ISettingsAPI {
  name: string;
  value: any;
}

const getGlobalSettings = (settings: ISettingsOptional|ISettingsAPI[]): ISettingsOptional => {
  if (Array.isArray(settings)) {
    let settingsObj: ISettings = SettingsDefault;
    const globalIndex = settings.findIndex(
      (setting: ISettingsAPI) => setting.name === globalSettingsName
    );
    if (globalIndex > -1) {
      const globalSettings = settings[globalIndex].value;

      if (typeof globalSettings === 'object') {
        settingsObj = {
          ...settingsObj,
          ...globalSettings,
        };
      }
    }

    return settingsObj;
  }

  return settings;
}

export const combineGlobalSettings = (settings: ISettings): ISettingsAPI => ({
  name: globalSettingsName,
  value: settings,
});

export const processSettings = (settings: ISettingsOptional|ISettingsAPI[]): ISettings => ({
  ...SettingsDefault,
  ...getGlobalSettings(settings),
});
