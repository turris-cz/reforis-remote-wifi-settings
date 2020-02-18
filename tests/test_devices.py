#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus

from reforis.test_utils import mock_backend_response


SUBORDINATES = [
    {
        'controller_id': '1234',
        'options': {'custom_name': 'raz dwa trzy cztery'},
        'enabled': True,
    },
    {
        'controller_id': '5678',
        'options': {'custom_name': ''},
        'enabled': True,
    },
    {
        'controller_id': 'foobar',
        'options': {'custom_name': ''},
        'enabled': False,
    },
]


@mock_backend_response({'subordinates': {'list': {'subordinates': SUBORDINATES}}})
def test_post_reset(client):
    response = client.get('/remote-wifi-settings/api/devices')
    assert response.status_code == HTTPStatus.OK
    assert response.json == [
        {'controller_id': SUBORDINATES[0]['controller_id'], 'custom_name': SUBORDINATES[0]['options']['custom_name']},
        {'controller_id': SUBORDINATES[1]['controller_id'], 'custom_name': SUBORDINATES[1]['options']['custom_name']}
    ]
