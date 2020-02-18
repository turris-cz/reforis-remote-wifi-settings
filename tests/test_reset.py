#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from unittest import mock

from reforis.test_utils import mock_backend_response

from .utils import perform_missing_controller


@mock_backend_response({'wifi': {'reset': {'result': True}}})
def test_post_reset(client):
    response = client.post('/remote-wifi-settings/api/reset/1234')
    assert response.status_code == HTTPStatus.OK
    assert response.json == {'result': True}


@mock_backend_response({'wifi': {'reset': {'result': False}}})
def test_post_reset_error(client):
    response = client.post('/remote-wifi-settings/api/reset/1234')
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == 'Cannot reset Wi-Fi settings.'


def test_post_settings_missing_controller(client):
    with mock.patch('flask.current_app.backend.perform') as perform_mock:
        perform_mock.side_effect = perform_missing_controller
        response = client.post('/remote-wifi-settings/api/reset/1234')
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == 'Device \'1234\' is not available or does not have any Wi-Fi interfaces.'
