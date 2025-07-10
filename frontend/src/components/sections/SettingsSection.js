import React, { useState } from 'react';
import { Volume2, Wifi, Download, Bell, Shield, User, Palette, Headphones, Smartphone, Monitor } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

const SettingsSection = () => {
  const [settings, setSettings] = useState({
    volume: [75],
    audioQuality: 'high',
    autoplay: true,
    notifications: true,
    downloadQuality: 'high',
    theme: 'dark',
    language: 'en',
    crossfade: [3],
    normalization: true,
    gaplessPlayback: true,
    showUnavailableMusic: false,
    autoDownload: false,
    cellularStreaming: true,
    cellularDownload: false,
    lowPowerMode: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400 text-lg">Customize your AudioStream experience</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          Premium
        </Badge>
      </div>

      <Tabs defaultValue="audio" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 border-gray-700">
          <TabsTrigger value="audio" className="text-gray-400 data-[state=active]:text-white">
            Audio
          </TabsTrigger>
          <TabsTrigger value="playback" className="text-gray-400 data-[state=active]:text-white">
            Playback
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-gray-400 data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="text-gray-400 data-[state=active]:text-white">
            Privacy
          </TabsTrigger>
          <TabsTrigger value="account" className="text-gray-400 data-[state=active]:text-white">
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audio" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Volume2 className="h-5 w-5 mr-2" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Volume</label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={settings.volume}
                    onValueChange={(value) => handleSettingChange('volume', value)}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-gray-400 text-sm w-12">{settings.volume[0]}%</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Audio Quality</label>
                <Select value={settings.audioQuality} onValueChange={(value) => handleSettingChange('audioQuality', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="low">Low (96 kbps)</SelectItem>
                    <SelectItem value="normal">Normal (160 kbps)</SelectItem>
                    <SelectItem value="high">High (320 kbps)</SelectItem>
                    <SelectItem value="lossless">Lossless (FLAC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Crossfade</label>
                <div className="flex items-center space-x-4">
                  <Slider
                    value={settings.crossfade}
                    onValueChange={(value) => handleSettingChange('crossfade', value)}
                    max={10}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-gray-400 text-sm w-12">{settings.crossfade[0]}s</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-white">Volume Normalization</label>
                  <p className="text-xs text-gray-400">Maintain consistent volume across tracks</p>
                </div>
                <Switch
                  checked={settings.normalization}
                  onCheckedChange={(checked) => handleSettingChange('normalization', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-white">Gapless Playback</label>
                  <p className="text-xs text-gray-400">No silence between tracks</p>
                </div>
                <Switch
                  checked={settings.gaplessPlayback}
                  onCheckedChange={(checked) => handleSettingChange('gaplessPlayback', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="playback" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Headphones className="h-5 w-5 mr-2" />
                Playback Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-white">Autoplay</label>
                  <p className="text-xs text-gray-400">Automatically play similar music when queue ends</p>
                </div>
                <Switch
                  checked={settings.autoplay}
                  onCheckedChange={(checked) => handleSettingChange('autoplay', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-white">Show Unavailable Music</label>
                  <p className="text-xs text-gray-400">Display grayed out tracks not available in your region</p>
                </div>
                <Switch
                  checked={settings.showUnavailableMusic}
                  onCheckedChange={(checked) => handleSettingChange('showUnavailableMusic', checked)}
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Language</label>
                <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                    <SelectItem value="pt">Portuguese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-white">Download Quality</label>
                <Select value={settings.downloadQuality} onValueChange={(value) => handleSettingChange('downloadQuality', value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="normal">Normal (160 kbps)</SelectItem>
                    <SelectItem value="high">High (320 kbps)</SelectItem>
                    <SelectItem value="lossless">Lossless (FLAC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-white">Auto Download</label>
                  <p className="text-xs text-gray-400">Automatically download liked songs</p>
                </div>
                <Switch
                  checked={settings.autoDownload}
                  onCheckedChange={(checked) => handleSettingChange('autoDownload', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-white">Push Notifications</label>
                  <p className="text-xs text-gray-400">Receive notifications about new releases and recommendations</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">New releases from artists you follow</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Playlist updates</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Friend activity</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Recommended music</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white">Data & Privacy</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Share listening activity with friends</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Allow personalized recommendations</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Use listening history for ads</span>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white">Data Usage</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-300">Stream on cellular</span>
                      <p className="text-xs text-gray-500">Use mobile data for streaming</p>
                    </div>
                    <Switch
                      checked={settings.cellularStreaming}
                      onCheckedChange={(checked) => handleSettingChange('cellularStreaming', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-300">Download on cellular</span>
                      <p className="text-xs text-gray-500">Download music using mobile data</p>
                    </div>
                    <Switch
                      checked={settings.cellularDownload}
                      onCheckedChange={(checked) => handleSettingChange('cellularDownload', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-300">Low power mode</span>
                      <p className="text-xs text-gray-500">Reduce background activity</p>
                    </div>
                    <Switch
                      checked={settings.lowPowerMode}
                      onCheckedChange={(checked) => handleSettingChange('lowPowerMode', checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button variant="outline" className="w-full border-gray-600 text-gray-400 hover:text-white">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-400 hover:text-white">
                  Update Email
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-400 hover:text-white">
                  Manage Subscription
                </Button>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-white">Danger Zone</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-red-600 text-red-400 hover:text-red-300 hover:border-red-500">
                    Log Out
                  </Button>
                  <Button variant="outline" className="w-full border-red-600 text-red-400 hover:text-red-300 hover:border-red-500">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsSection;