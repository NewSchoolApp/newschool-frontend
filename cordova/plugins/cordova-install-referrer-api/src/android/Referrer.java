package com.github.byorty;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.json.*;

import com.android.installreferrer.api.*;
import com.android.installreferrer.api.InstallReferrerClient.InstallReferrerResponse;

import android.os.RemoteException;

public class Referrer extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
        if (action.equals("get")) {
            InstallReferrerClient referrerClient = InstallReferrerClient.newBuilder(this.cordova.getActivity().getApplicationContext()).build();
            referrerClient.startConnection(new InstallReferrerStateListener() {
                @Override
                public void onInstallReferrerSetupFinished(int responseCode) {
                    try {
                        if (responseCode == InstallReferrerResponse.OK) {
                            ReferrerDetails response = referrerClient.getInstallReferrer();
                            JSONObject result = new JSONObject();
                            result.put("referrer", response.getInstallReferrer());
                            result.put("clickTimestamp", response.getReferrerClickTimestampSeconds());
                            result.put("installBeginTimestamp", response.getInstallBeginTimestampSeconds());
                            callbackContext.success(result);
                        } else {
                            JSONObject result = new JSONObject();
                            result.put("error", responseCode);
                            callbackContext.error(result);
                        }
                    } catch (RemoteException e) {
                    } catch (JSONException e) {
                    }

                    referrerClient.endConnection();
                }

                @Override
                public void onInstallReferrerServiceDisconnected() {
                }
            });

            return true;
        } else {
            return false;
        }
    }
}