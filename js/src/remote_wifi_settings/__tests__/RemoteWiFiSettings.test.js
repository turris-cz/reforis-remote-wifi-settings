/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import mockAxios from "jest-mock-axios";
import { render } from "foris/testUtils/customTestRender";

import RemoteWiFiSettings from "../RemoteWiFiSettings";

describe("<RemoteWiFiSettings />", () => {
    it("should render component", () => {
        const { getByText } = render(<RemoteWiFiSettings />);
        expect(getByText("Remote Wi-Fi Settings")).toBeDefined();
        expect(mockAxios.get).toBeCalledWith("/reforis/remote-wifi-settings/api/example", expect.anything());
    });
});
