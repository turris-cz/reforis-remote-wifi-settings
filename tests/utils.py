from reforis.test_utils import get_mocked_client

def get_mocked_remote_wifi_settings_client(*args, **kwargs):
    return get_mocked_client('reforis_remote_wifi_settings', *args, *kwargs)
