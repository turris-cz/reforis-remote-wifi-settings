/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useEffect, useState } from "react";

import { useAPIGet, API_STATE } from "foris";

import API_URLs from "API";

export default function useRemoteDevices(setSelectedDevice) {
    const [isLoading, setIsLoading] = useState(true);
    const [getDevicesResponse, getDevices] = useAPIGet(API_URLs.devices);
    const [availableDevices, setAvailableDevices] = useState([]);

    // Initial data fetch
    useEffect(() => {
        getDevices();
    }, [getDevices]);

    // Handle fetch result
    useEffect(() => {
        if (getDevicesResponse.state === API_STATE.SUCCESS) {
            setIsLoading(false);

            if (getDevicesResponse.data.length === 0) {
                return;
            }

            // Update selected and available devices
            setSelectedDevice(getDevicesResponse.data[0].controller_id);
            setAvailableDevices(
                getDevicesResponse.data.reduce((devices, device) => {
                    const deviceName = device.custom_name
                        ? `${device.custom_name} (ID: ${device.controller_id})`
                        : device.controller_id;
                    return {
                        ...devices,
                        [device.controller_id]: deviceName,
                    };
                }, {})
            );
        } else if (getDevicesResponse.state === API_STATE.ERROR) {
            setIsLoading(false);
        }
    }, [
        getDevicesResponse,
        setIsLoading,
        setAvailableDevices,
        setSelectedDevice,
    ]);

    const hasError = getDevicesResponse.state === API_STATE.ERROR;

    return [isLoading, hasError, availableDevices];
}
