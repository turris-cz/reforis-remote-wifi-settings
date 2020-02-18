#  Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from reforis.test_utils.mocked_send import get_mocked_send
from foris_client.buses.base import ControllerMissing


def perform_missing_controller(*args, **kwargs):
    if 'wifi' in args:
        raise ControllerMissing('1234')
    mocked_send = get_mocked_send()
    return mocked_send(*args, **kwargs)
