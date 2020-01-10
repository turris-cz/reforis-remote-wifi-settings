#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
from unittest.mock import mock_open, patch

from reforis.test_utils import mock_backend_response


@mock_backend_response({'example_module': {'example_action': {}}})
def test_get_example(client):
    response = client.get('/remote-wifi-settings/api/example')
    assert response.status_code == HTTPStatus.OK
    assert response.json == {}


@mock_backend_response({'example_module': {'example_action': {'result': True}}})
def test_post_example_invalid_json(client):
    response = client.post('/remote-wifi-settings/api/example')
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == 'Invalid JSON'


@mock_backend_response({'example_module': {'example_action': {'key': 'value'}}})
def test_post_example_backend_error(client):
    response = client.post('/remote-wifi-settings/api/example', json={'modules': []})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
    assert response.json == 'Cannot create entity'
