/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

import { WiFiSettings, Select, Spinner, ErrorMessage } from "foris";

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

    const [isLoading, hasError, availableDevices] = useRemoteDevices(
        setSelectedDevice
    );

    let componentContent;
    if (isLoading) {
        componentContent = <Spinner />;
    } else if (hasError) {
        componentContent = <ErrorMessage />;
    } else if (availableDevices.length === 0) {
        componentContent = (
            <p className="text-muted text-center">
                {_(
                    "There are no devices for which you can manage Wi-Fi settings."
                )}
            </p>
        );
    } else {
        componentContent = (
            <>
                <Select
                    label={_("Device")}
                    choices={availableDevices}
                    value={selectedDevice}
                    helpText={_(
                        "Select device for which you want to edit Wi-Fi settings."
                    )}
                    onChange={(event) => handleChange(event)}
                />
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
            {componentContent}
        </>
    );
}
