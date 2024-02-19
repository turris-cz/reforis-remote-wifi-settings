#  Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

""" Remote Wi-Fi settings module for ReForis. """

from pathlib import Path
from http import HTTPStatus

from flask import Blueprint, current_app, jsonify, request
from flask_babel import gettext as _

from reforis.foris_controller_api.utils import validate_json, APIError
from foris_client.buses.base import ControllerMissing

blueprint = Blueprint(
    'RemoteWiFiSettings',
    __name__,
    url_prefix='/remote-wifi-settings/api',
)

BASE_DIR = Path(__file__).parent

remote_wifi_settings = {
    'blueprint': blueprint,
    # Define {python_module_name}/js/app.min.js
    # See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
    'js_app_path': 'reforis_remote_wifi_settings/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/devices', methods=['GET'])
def get_devices():
    """ Get list of enabled Wi-Fi devices. """
    devices = current_app.backend.perform('subordinates', 'list')['subordinates']
    enabled_devices = [
        {'controller_id': device['controller_id'], 'custom_name': device['options']['custom_name']}
        for device in devices
        if device['enabled'] is True
    ]
    return jsonify(enabled_devices)


@blueprint.route('/settings/<controller_id>', methods=['GET'])
def get_settings(controller_id):
    """ Get Wi-Fi settings for a specific device. """
    return jsonify(perform_wifi_action('get_settings', controller_id))


@blueprint.route('/settings/<controller_id>', methods=['POST'])
def post_settings(controller_id):
    """ Update Wi-Fi settings for a specific device. """
    validate_json(request.json, {'devices': list})

    response = perform_wifi_action('update_settings', controller_id, request.json)
    if response.get('result') is not True:
        raise APIError(_('Cannot update Wi-Fi settings.'), HTTPStatus.INTERNAL_SERVER_ERROR)

    return jsonify(response), HTTPStatus.OK


@blueprint.route('/reset/<controller_id>', methods=['POST'])
def post_reset(controller_id):
    """ Reset Wi-Fi settings for a specific device. """
    response = perform_wifi_action('reset', controller_id)
    if response.get('result') is not True:
        raise APIError(_('Cannot reset Wi-Fi settings.'), HTTPStatus.INTERNAL_SERVER_ERROR)

    return jsonify(response), HTTPStatus.OK


def perform_wifi_action(action, controller_id, data=None):
    """ Perform Wi-Fi action on a specific device. """
    try:
        return current_app.backend.perform('wifi', action, data, controller_id=controller_id)
    except ControllerMissing as e:
        raise APIError(
            _(f"Device '{controller_id}' is not available or does not have any Wi-Fi interfaces."),
            HTTPStatus.INTERNAL_SERVER_ERROR,
        ) from e
