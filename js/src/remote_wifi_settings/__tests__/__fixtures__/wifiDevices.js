/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

export const wifiDevices = {
    devices: [
        {
            SSID: "First",
            available_bands: [
                {
                    available_channels: [
                        {
                            frequency: 2412,
                            number: 1,
                            radar: false,
                        },
                        {
                            frequency: 2417,
                            number: 2,
                            radar: false,
                        },
                        {
                            frequency: 2422,
                            number: 3,
                            radar: false,
                        },
                        {
                            frequency: 2427,
                            number: 4,
                            radar: false,
                        },
                        {
                            frequency: 2432,
                            number: 5,
                            radar: false,
                        },
                        {
                            frequency: 2437,
                            number: 6,
                            radar: false,
                        },
                        {
                            frequency: 2442,
                            number: 7,
                            radar: false,
                        },
                        {
                            frequency: 2447,
                            number: 8,
                            radar: false,
                        },
                        {
                            frequency: 2452,
                            number: 9,
                            radar: false,
                        },
                        {
                            frequency: 2457,
                            number: 10,
                            radar: false,
                        },
                        {
                            frequency: 2462,
                            number: 11,
                            radar: false,
                        },
                        {
                            frequency: 2467,
                            number: 12,
                            radar: false,
                        },
                        {
                            frequency: 2472,
                            number: 13,
                            radar: false,
                        },
                    ],
                    available_htmodes: ["NOHT", "HT20", "HT40"],
                    hwmode: "11g",
                },
                {
                    available_channels: [
                        {
                            frequency: 5180,
                            number: 36,
                            radar: false,
                        },
                        {
                            frequency: 5200,
                            number: 40,
                            radar: false,
                        },
                        {
                            frequency: 5220,
                            number: 44,
                            radar: false,
                        },
                        {
                            frequency: 5240,
                            number: 48,
                            radar: false,
                        },
                        {
                            frequency: 5260,
                            number: 52,
                            radar: true,
                        },
                        {
                            frequency: 5280,
                            number: 56,
                            radar: true,
                        },
                        {
                            frequency: 5300,
                            number: 60,
                            radar: true,
                        },
                        {
                            frequency: 5320,
                            number: 64,
                            radar: true,
                        },
                        {
                            frequency: 5500,
                            number: 100,
                            radar: true,
                        },
                        {
                            frequency: 5520,
                            number: 104,
                            radar: true,
                        },
                        {
                            frequency: 5540,
                            number: 108,
                            radar: true,
                        },
                        {
                            frequency: 5560,
                            number: 112,
                            radar: true,
                        },
                        {
                            frequency: 5580,
                            number: 116,
                            radar: true,
                        },
                        {
                            frequency: 5600,
                            number: 120,
                            radar: true,
                        },
                        {
                            frequency: 5620,
                            number: 124,
                            radar: true,
                        },
                        {
                            frequency: 5640,
                            number: 128,
                            radar: true,
                        },
                        {
                            frequency: 5660,
                            number: 132,
                            radar: true,
                        },
                        {
                            frequency: 5680,
                            number: 136,
                            radar: true,
                        },
                        {
                            frequency: 5700,
                            number: 140,
                            radar: true,
                        },
                    ],
                    available_htmodes: [
                        "NOHT",
                        "HT20",
                        "HT40",
                        "VHT20",
                        "VHT40",
                        "VHT80",
                    ],
                    hwmode: "11a",
                },
            ],
            channel: 36,
            enabled: false,
            guest_wifi: {
                SSID: "Turris-guest",
                enabled: false,
                password: "",
            },
            hidden: false,
            htmode: "VHT80",
            hwmode: "11a",
            id: 0,
            password: "",
        },
        {
            SSID: "Second",
            available_bands: [
                {
                    available_channels: [
                        {
                            frequency: 2412,
                            number: 1,
                            radar: false,
                        },
                        {
                            frequency: 2417,
                            number: 2,
                            radar: false,
                        },
                        {
                            frequency: 2422,
                            number: 3,
                            radar: false,
                        },
                        {
                            frequency: 2427,
                            number: 4,
                            radar: false,
                        },
                        {
                            frequency: 2432,
                            number: 5,
                            radar: false,
                        },
                        {
                            frequency: 2437,
                            number: 6,
                            radar: false,
                        },
                        {
                            frequency: 2442,
                            number: 7,
                            radar: false,
                        },
                        {
                            frequency: 2447,
                            number: 8,
                            radar: false,
                        },
                        {
                            frequency: 2452,
                            number: 9,
                            radar: false,
                        },
                        {
                            frequency: 2457,
                            number: 10,
                            radar: false,
                        },
                        {
                            frequency: 2462,
                            number: 11,
                            radar: false,
                        },
                        {
                            frequency: 2467,
                            number: 12,
                            radar: false,
                        },
                        {
                            frequency: 2472,
                            number: 13,
                            radar: false,
                        },
                    ],
                    available_htmodes: ["NOHT", "HT20", "HT40"],
                    hwmode: "11g",
                },
            ],
            channel: 11,
            enabled: false,
            guest_wifi: {
                SSID: "Turris-guest",
                enabled: false,
                password: "",
            },
            hidden: false,
            htmode: "HT20",
            hwmode: "11g",
            id: 1,
            password: "",
        },
    ],
};
