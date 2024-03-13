#  Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from unittest import mock

from reforis.test_utils import mock_backend_response

from .utils import perform_missing_controller


@mock_backend_response({"wifi": {"get_settings": {"foo": "bar"}}})
def test_get_settings(client):
    response = client.get("/remote-wifi-settings/api/settings/1234")
    assert response.status_code == HTTPStatus.OK
    assert response.json == {"foo": "bar"}


def test_get_settings_missing_controller(client):
    with mock.patch("flask.current_app.backend.perform") as perform_mock:
        perform_mock.side_effect = perform_missing_controller
        response = client.get("/remote-wifi-settings/api/settings/1234")
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == "Device '1234' is not available or does not have any Wi-Fi interfaces."


@mock_backend_response({"wifi": {"update_settings": {"result": True}}})
def test_post_settings(client):
    response = client.post("/remote-wifi-settings/api/settings/1234", json={"devices": []})
    assert response.status_code == HTTPStatus.OK
    assert response.json == {"result": True}


@mock_backend_response({"wifi": {"reset": {"update_settings": False}}})
def test_post_settings_error(client):
    response = client.post("/remote-wifi-settings/api/settings/1234", json={"devices": []})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == "Cannot update Wi-Fi settings."


@mock_backend_response({"wifi": {"reset": {"update_settings": False}}})
def test_post_settings_invalid_json(client):
    response = client.post("/remote-wifi-settings/api/settings/1234", json=False)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == "Invalid JSON"


def test_post_settings_missing_controller(client):
    with mock.patch("flask.current_app.backend.perform") as perform_mock:
        perform_mock.side_effect = perform_missing_controller
        response = client.post("/remote-wifi-settings/api/settings/1234", json={"devices": []})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == "Device '1234' is not available or does not have any Wi-Fi interfaces."
