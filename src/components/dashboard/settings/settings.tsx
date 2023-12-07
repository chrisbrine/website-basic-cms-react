import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Editor } from "../../forms";
import { useState } from "react";
import { combineGlobalSettings, processSettings } from "../../../types";
import { fetchAddSetting, fetchUpdateSetting, getMainSettings } from "../../../store/reducers";
import { AnyAction } from "@reduxjs/toolkit";

export default function Settings() {
  const dispatch = useDispatch();
  const settings = useSelector(getMainSettings);
  const [settingsState, setSettingsState] = useState(processSettings(settings));

  const setSettings = (args: any) => {
    switch (args.field) {
      case 'skill_categories':
        setSettingsState({
          ...settingsState,
          skill_categories: args.value.split(','),
        });
        break;
      case 'blog_categories':
        setSettingsState({
          ...settingsState,
          blog_categories: args.value.split(','),
        });
        break;
      case 'user_id':
        setSettingsState({
          ...settingsState,
          user_id: args.value,
        });
        break;
      case 'resume_id':
        setSettingsState({
          ...settingsState,
          resume_id: args.value,
        });
        break;
      case 'about':
        setSettingsState({
          ...settingsState,
          about: args.value,
        });
        break;
      case 'home':
        setSettingsState({
          ...settingsState,
          home: args.value,
        });
        break;
      default:
        break;
    }
  }

  const saveSettings = () => {
    const globalSettings = combineGlobalSettings(settingsState);
    const nameIndex = settings.findIndex(
      (setting: any) => setting.name === globalSettings.name
    );
    if (nameIndex >= 0) {
      const settingId = settings[nameIndex].id;
      dispatch(fetchUpdateSetting({
        id: settingId,
        setting: globalSettings,
      }) as unknown as AnyAction);
    } else {
      dispatch(fetchAddSetting(globalSettings) as unknown as AnyAction);
    }
  }

  return (
    <Form>
      <h1>Settings</h1>
      <Input
        label="Skill Categories"
        name="skill_categories"
        placeholder="Enter categories for skills separated by commas (,)"
        value={settingsState.skill_categories.join(',')}
        onChange={setSettings}
      />
      <Input
        label="Blog Post Categories"
        name="blog_categories"
        placeholder="Enter categories for blog posts separated by commas (,)"
        value={settingsState.blog_categories.join(',')}
        onChange={setSettings}
      />
      <Input
        label='User ID'
        name='user_id'
        readonly={true}
        placeholder='Enter the user ID number for the user the site is based on'
        value={settingsState.user_id ?? 1}
        onChange={setSettings}
      />
      <Input
        label='Resume ID'
        name='resume_id'
        readonly={true}
        placeholder='Enter the resume ID number for the resume the site is based on'
        value={settingsState.resume_id ?? 1}
        onChange={setSettings}
      />
      <Editor
        label='About'
        name='about'
        placeholder='Enter the about for the site'
        value={settingsState.about}
        onChange={setSettings}
      />
      <Editor
        label='Home Page Content'
        name='home'
        placeholder='Enter the content for the home page'
        value={settingsState.home}
        onChange={setSettings}
      />
      <Button
        text='Save Settings'
        onClick={saveSettings}
      />
    </Form>
  );
}
