/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import {
    render, getByText, getAllByText, getByDisplayValue, wait, fireEvent,
} from "foris/testUtils/customTestRender";
import { mockJSONError } from "foris/testUtils/network";
import { WebSockets } from "foris";

import RemoteWiFiSettings from "../RemoteWiFiSettings";
import { wifiDevices } from "./__fixtures__/wifiDevices";

function buildURL(endpoint, ID = "") {
    return `/reforis/remote-wifi-settings/api/${endpoint}${ID ? `/${ID}` : ""}`;
}

function getDeviceName(device) {
    return `${device.custom_name} (ID: ${device.controller_id})`
}

describe("<RemoteWiFiSettings />", () => {
    let container;
    const devices = [
        { controller_id: "Q1A2Z3", custom_name: "foo" },
        { controller_id: "W1S2X3", custom_name: "bar" },
    ];

    beforeEach(() => {
        const webSockets = new WebSockets();
        ({ container } = render(<RemoteWiFiSettings ws={webSockets} />));
    });

    it("should display spinner", () => {
        expect(container).toMatchSnapshot();
    });

    it("should handle API error", async () => {
        expect(mockAxios.get).toBeCalledWith(buildURL("devices"), expect.anything());
        mockJSONError();
        await wait(() => {
            expect(
                getByText(container, "An error occurred while fetching data."),
            ).toBeDefined();
        });
    });

    it("should handle empty list of devices", async () => {
        mockAxios.mockResponse({ data: [] });
        await wait(() => {
            expect(
                getByText(container, "There are no devices for which you can manage Wi-Fi settings."),
            ).toBeDefined();
        });
    });

    describe("device dropdown", () => {
        let saveButton;
        let resetButton;

        beforeEach(async () => {
            // Mock GET "devices" response
            mockAxios.mockResponse({ data: devices });

            // Handle device details
            await wait(() => { getByText(container, getDeviceName(devices[0])); });
            mockAxios.mockResponse({ data: wifiDevices });

            // Wait for form to appear
            await wait(() => { getByText(container, "Wi-Fi 1"); });

            saveButton = getByText(container, "Save");
            // First element found is a header
            resetButton = getAllByText(container, "Reset Wi-Fi Settings")[1];
        });

        it("should save default device", async () => {
            // See if default device is loaded
            expect(mockAxios.get).toBeCalledWith(
                buildURL("settings", devices[0].controller_id), expect.anything(),
            );

            fireEvent.click(saveButton);
            expect(mockAxios.post).toBeCalledWith(
                buildURL("settings", devices[0].controller_id), expect.anything(), expect.anything(),
            );
        });

        it("should save selected device", async () => {
            // Select second device
            const dropdown = getByDisplayValue(container, getDeviceName(devices[0]));
            fireEvent.change(dropdown, { target: { value: devices[1].controller_id } });
            expect(mockAxios.get).toBeCalledWith(
                buildURL("settings", devices[1].controller_id), expect.anything(),
            );

            // Form is reloading
            await wait(() => { getByText(container, "Load settings"); });
            mockAxios.mockResponse({ data: wifiDevices });
            await wait(() => { getByText(container, "Save"); });

            // Save second device
            fireEvent.click(saveButton);
            expect(mockAxios.post).toBeCalledWith(
                buildURL("settings", devices[1].controller_id), expect.anything(), expect.anything(),
            );
        });

        it("should reset default device", async () => {
            fireEvent.click(resetButton);
            expect(mockAxios.post).toBeCalledWith(
                buildURL("reset", devices[0].controller_id), undefined, expect.anything(),
            );
        });

        it("should reset second device", async () => {
            // Change device
            const dropdown = getByDisplayValue(container, getDeviceName(devices[0]));
            fireEvent.change(dropdown, { target: { value: devices[1].controller_id } });
            mockAxios.mockResponse({ data: wifiDevices });
            await wait(() => { getByText(container, "Save"); });

            // Reset second device
            fireEvent.click(resetButton);
            expect(mockAxios.post).toBeCalledWith(
                buildURL("reset", devices[1].controller_id), undefined, expect.anything(),
            );
        });
    });
});
