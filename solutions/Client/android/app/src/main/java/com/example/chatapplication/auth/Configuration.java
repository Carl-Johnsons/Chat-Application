// TODO: https://github.com/openid/AppAuth-Android/blob/master/app/java/net/openid/appauthdemo/Configuration.java

package com.example.chatapplication.auth;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Resources;
import android.net.Uri;
import android.text.TextUtils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import net.openid.appauth.connectivity.ConnectionBuilder;
import net.openid.appauth.connectivity.DefaultConnectionBuilder;

import org.json.JSONObject;

import java.lang.ref.WeakReference;

public class Configuration {
    private static final String TAG = "Configuration";

    private static final String PREF_NAME = "config";
    private static final String KEY_LAST_HASH = "lastHash";

    private static WeakReference<Configuration> sInstance = new WeakReference<>(null);

    private final Context mContext;
    private final SharedPreferences mPref;
    private final Resources mResources;

    private JSONObject mConfigJson;
    private String mConfigHash;
    private String mConfigError;

    private String mClientId;
    private String mScope;
    private Uri mRedirectUri;
    private Uri mEndSessionRedirectUri;
    private Uri mDiscoveryUri;
    private Uri mAuthEndpointUri;
    private Uri mTokenEndpointUri;
    private Uri mEndSessionEndpoint;
    private Uri mRegistrationEndpointUri;
    private Uri mUserInfoEndpointUri;
    private boolean mHttpsRequired;

    public static Configuration getInstance(Context context) {
        Configuration config = sInstance.get();
        if (config == null) {
            config = new Configuration(context);
            sInstance = new WeakReference<>(config);
        }
        return config;
    }

    private Configuration(Context context) {
        mContext = context;
        mPref = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        mResources = context.getResources();
        try {
            readConfiguration();
        } catch (Exception ex) {
            mConfigError = ex.getMessage();
        }
    }

    public boolean hasConfigurationChanged() {
        String lastHash = getLastKnownConfigHash();
        return !mConfigHash.equals(lastHash);
    }

    public boolean isValid() {
        return mConfigError == null;
    }

    @Nullable
    public String getConfigurationError() {
        return mConfigError;
    }

    /**
     * Indicates that the current configuration should be accepted as the "last known valid"
     * configuration.
     */
    public void acceptConfiguration() {
        mPref.edit().putString(KEY_LAST_HASH, mConfigHash).apply();
    }

    @Nullable
    public String getClientId() {
        return mClientId;
    }

    public String getScope() {
        return mScope;
    }

    @NonNull
    public Uri getRedirectUri() {
        return mRedirectUri;
    }

    @Nullable
    public Uri getDiscoveryUri() {
        return mDiscoveryUri;
    }

    @Nullable
    public Uri getEndSessionRedirectUri() {
        return mEndSessionRedirectUri;
    }

    @Nullable
    public Uri getAuthEndpointUri() {
        return mAuthEndpointUri;
    }

    @Nullable
    public Uri getTokenEndpointUri() {
        return mTokenEndpointUri;
    }

    @Nullable
    public Uri getEndSessionEndpoint() {
        return mEndSessionEndpoint;
    }

    @Nullable
    public Uri getRegistrationEndpointUri() {
        return mRegistrationEndpointUri;
    }

    @Nullable
    public Uri getUserInfoEndpointUri() {
        return mUserInfoEndpointUri;
    }

    public boolean isHttpsRequired() {
        return mHttpsRequired;
    }

    public ConnectionBuilder getConnectionBuilder() {
        if (isHttpsRequired()) {
            return DefaultConnectionBuilder.INSTANCE;
        }
        // TODO: fix this later
        return DefaultConnectionBuilder.INSTANCE;
    }

    private String getLastKnownConfigHash() {
        return mPref.getString(KEY_LAST_HASH, null);
    }

    private void readConfiguration() throws Exception {
        // TODO: add config later
        mClientId = getConfigString("client_id");
        mScope = getRequiredConfigString("authorization_scope");
        mRedirectUri = getRequiredConfigUri("redirect_uri");
        mEndSessionRedirectUri = getRequiredConfigUri("end_session_redirect_uri");
    }

    @Nullable
    private String getConfigString(String propName) {
        String value = mConfigJson.optString(propName);
        if (value == null) {
            return null;
        }
        value = value.trim();
        if (TextUtils.isEmpty(value)) {
            return null;
        }
        return value;
    }

    @NonNull
    private String getRequiredConfigString(String propName) throws Exception {
        String value = getConfigString(propName);
        if (value == null) {
            throw new Exception(propName + " is required but not specified in the configuration");
        }
        return value;
    }

    @NonNull
    private Uri getRequiredConfigUri(String propName) throws Exception {
        String uriStr = getRequiredConfigString(propName);
        Uri uri;
        try {
            uri = Uri.parse(uriStr);
        } catch (Throwable ex) {
            throw new Exception(propName + " could not be parsed", ex);
        }

        if (!uri.isHierarchical() || !uri.isAbsolute()) {
            throw new Exception(
                    propName + " must be hierarchical and absolute");
        }

        if (!TextUtils.isEmpty(uri.getEncodedUserInfo())) {
            throw new Exception(propName + " must not have user info");
        }

        if (!TextUtils.isEmpty(uri.getEncodedQuery())) {
            throw new Exception(propName + " must not have query parameters");
        }

        if (!TextUtils.isEmpty(uri.getEncodedFragment())) {
            throw new Exception(propName + " must not have a fragment");
        }
        return uri;
    }

    private Uri getRequiredConfigWebUri(String propName) throws Exception {
        Uri uri = getRequiredConfigUri(propName);
        String scheme = uri.getScheme();
        if (TextUtils.isEmpty(scheme) || !("http".equals(scheme)|| !("https".equals(scheme)))) {
            throw new Exception();
        }
        return  uri;
    }



    private boolean isRedirectUriRegistered() {
        // ensure that the redirect URI declared in the configuration is handled by some activity
        // in the app, by querying the package manager speculatively
        Intent redirectIntent = new Intent();
        redirectIntent.setPackage(mContext.getPackageName());
        redirectIntent.setAction(Intent.ACTION_VIEW);
        redirectIntent.addCategory(Intent.CATEGORY_BROWSABLE);
        redirectIntent.setData(mRedirectUri);

        return !mContext.getPackageManager().queryIntentActivities(redirectIntent, 0).isEmpty();
    }

    public static final class InvalidConfigurationException extends Exception {
        InvalidConfigurationException(String reason) {
            super(reason);
        }

        InvalidConfigurationException(String reason, Throwable cause) {
            super(reason, cause);
        }
    }
}
