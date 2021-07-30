/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import {
    WiFiSettings,
    Select,
    Spinner,
    ErrorMessage,
    formFieldsSize,
} from "foris";

import API_URLs from "API";
import useRemoteDevices from "./hooks";

RemoteWiFiSettings.propTypes = {
    ws: PropTypes.object.isRequired,
};

export default function RemoteWiFiSettings({ ws }) {
    const [selectedDevice, setSelectedDevice] = useState();
    const handleChange = useCallback(
        (event) => {
            setSelectedDevice(event.target.value);
        },
        [setSelectedDevice]
    );

    const [isLoading, hasError, availableDevices] =
        useRemoteDevices(setSelectedDevice);

    let componentContent;
    if (isLoading) {
        componentContent = <Spinner />;
    } else if (hasError) {
        componentContent = <ErrorMessage />;
    } else if (availableDevices.length === 0) {
        componentContent = (
            <div className={formFieldsSize}>
                <h2>{_("Available Devices")}</h2>
                <p className="text-muted text-center">
                    {_(`There are no devices for which you can manage Wi-Fi \
settings.`)}
                </p>
            </div>
        );
    } else {
        componentContent = (
            <>
                <div className={formFieldsSize}>
                    <h2>{_("Available Devices")}</h2>
                    <Select
                        label={_("Device")}
                        choices={availableDevices}
                        value={selectedDevice}
                        helpText={_(`Select device for which you want to edit Wi-Fi \
settings.`)}
                        onChange={(event) => handleChange(event)}
                    />
                </div>
                <WiFiSettings
                    ws={ws}
                    endpoint={`${API_URLs.settings}/${selectedDevice}`}
                    resetEndpoint={`${API_URLs.reset}/${selectedDevice}`}
                />
            </>
        );
    }

    return (
        <>
            <h1>{_("Wi-Fi Settings")}</h1>
            <p>{_("Here you can set up Wi-Fi on remote devices.")}</p>
            {componentContent}
        </>
    );
}
