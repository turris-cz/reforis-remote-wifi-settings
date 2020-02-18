/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import RemoteWiFiSettings from "./remote_wifi_settings/RemoteWiFiSettings";

const RemoteWiFiSettingsPlugin = {
    name: _("Wi-Fi Settings"),
    submenuId: "remote-devices",
    weight: 101,
    path: "/remote-wifi-settings",
    component: RemoteWiFiSettings,
};

ForisPlugins.push(RemoteWiFiSettingsPlugin);
